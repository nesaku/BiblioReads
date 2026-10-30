import { Readable, Transform } from "node:stream";
import { pipeline } from "node:stream/promises";
import { version } from "@/utils/version";

const MAX_IMAGE_BYTES = 10 * 1024 * 1024;
const MAX_IMAGE_PIXELS = 40e6;
const MAX_REDIRECTS = 3;
const DEFAULT_MAX_AGE = 86400;
const MAX_MAX_AGE = 31536000;
const ALLOWED_CONTENT_TYPES = new Set([
  "image/avif",
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/webp",
]);
const ALLOWED_HOSTS = [
  "gr-assets.com",
  "goodreads.com",
  "media-amazon.com",
  "ssl-images-amazon.com",
];
const REDIRECT_STATUSES = new Set([301, 302, 303, 307, 308]);

const isAllowedImageUrl = (url) =>
  url.protocol === "https:" &&
  !url.port &&
  !url.username &&
  !url.password &&
  ALLOWED_HOSTS.some(
    (host) => url.hostname === host || url.hostname.endsWith(`.${host}`),
  );

const getMaxAge = (value) => {
  const match =
    typeof value === "string" ? /^(\d+)([smhd])$/i.exec(value) : null;
  if (!match) return DEFAULT_MAX_AGE;

  const duration = Number(match[1]);
  const units = { s: 1, m: 60, h: 3600, d: 86400 };
  return Math.min(duration * units[match[2].toLowerCase()], MAX_MAX_AGE);
};

const fetchImage = async (url) => {
  const signal = AbortSignal.timeout(10000);
  let currentUrl = url;

  for (let redirects = 0; redirects <= MAX_REDIRECTS; redirects += 1) {
    const response = await fetch(currentUrl, {
      redirect: "manual",
      referrerPolicy: "no-referrer",
      signal,
    });

    if (!REDIRECT_STATUSES.has(response.status)) return response;

    const location = response.headers.get("location");
    await response.body?.cancel();
    if (!location || redirects === MAX_REDIRECTS) {
      throw new Error("Image source has too many or invalid redirects");
    }

    currentUrl = new URL(location, currentUrl);
    if (!isAllowedImageUrl(currentUrl)) {
      throw new Error("Image source redirected to a disallowed host");
    }
  }

  throw new Error("Image source has too many redirects");
};

const limitImageBytes = () => {
  let bytesRead = 0;

  return new Transform({
    transform(chunk, encoding, callback) {
      bytesRead += chunk.length;
      if (bytesRead > MAX_IMAGE_BYTES) {
        callback(new Error("Image exceeds the maximum allowed size"));
        return;
      }

      callback(null, chunk);
    },
  });
};

export default async function imageProxy(req, res) {
  res.setHeader("X-BiblioReads-Version", version);
  res.setHeader(
    "X-BiblioReads-Source",
    "https://github.com/nesaku/biblioreads",
  );

  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    res.status(405).end();
    return;
  }

  const source = req.query.url;
  if (typeof source !== "string") {
    res.status(400).end();
    return;
  }

  let imageUrl;
  try {
    imageUrl = new URL(source);
  } catch {
    res.status(400).end();
    return;
  }

  if (!isAllowedImageUrl(imageUrl)) {
    res.status(400).end();
    return;
  }

  try {
    const upstream = await fetchImage(imageUrl);
    if (!upstream.ok) {
      await upstream.body?.cancel();
      res.status(upstream.status === 404 ? 404 : 502).end();
      return;
    }

    const contentType = upstream.headers
      .get("content-type")
      ?.split(";")[0]
      .trim()
      .toLowerCase();
    if (!ALLOWED_CONTENT_TYPES.has(contentType)) {
      await upstream.body?.cancel();
      res.status(415).end();
      return;
    }

    const contentLengthHeader = upstream.headers.get("content-length");
    const contentLength =
      contentLengthHeader && /^\d+$/.test(contentLengthHeader)
        ? Number(contentLengthHeader)
        : null;
    if (contentLength !== null && contentLength > MAX_IMAGE_BYTES) {
      await upstream.body?.cancel();
      res.status(413).end();
      return;
    }

    if (!upstream.body) {
      res.status(502).end();
      return;
    }

    const toWebp = req.query.output === "webp" && contentType !== "image/webp";
    const maxAge = getMaxAge(req.query.maxage);
    const transformer = toWebp
      ? (await import("sharp"))
          .default({
            limitInputPixels: MAX_IMAGE_PIXELS,
            sequentialRead: true,
          })
          .webp({ effort: 1 })
      : null;

    res.setHeader("Content-Type", toWebp ? "image/webp" : contentType);
    res.setHeader("X-Image-Proxy", `BiblioReads ${version}`);
    res.setHeader(
      "Cache-Control",
      `public, max-age=${maxAge}, s-maxage=${maxAge}`,
    );
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("Referrer-Policy", "no-referrer");
    if (!toWebp && contentLength !== null) {
      res.setHeader("Content-Length", contentLength);
    }

    const streams = [
      Readable.fromWeb(upstream.body),
      limitImageBytes(),
      ...(transformer ? [transformer] : []),
      res,
    ];

    await pipeline(...streams);
  } catch (error) {
    console.error("Image proxy request failed:", error.name);
    if (res.headersSent) {
      res.destroy();
      return;
    }
    res.status(502).end();
  }
}
