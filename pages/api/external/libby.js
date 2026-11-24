import { getUserAgent } from "@/utils/userAgent";
import { apiVersion as version } from "@/utils/version";

const LibbyLink = async (req, res) => {
  if (req.method !== "GET") {
    res.statusCode = 405;
    return res.json({
      status: "Error 405 - Method Not Allowed",
      version: version,
    });
  }

  const { id } = req.query;
  if (!id) {
    res.statusCode = 400;
    return res.json({
      status: "Error - Missing OverDrive ID",
      version: version,
    });
  }

  const apiURL = `https://thunder.api.overdrive.com/v2/media/${encodeURIComponent(
    id,
  )}/`;

  try {
    const response = await fetch(apiURL, {
      method: "GET",
      headers: new Headers({
        "User-Agent": getUserAgent(),
        Accept: "application/json",
      }),
    });

    if (!response.ok) {
      res.statusCode = response.status;
      return res.json({
        status: "Error - Unable to fetch Libby data",
        version: version,
        apiURL: apiURL,
      });
    }

    const data = await response.json();
    const lastScraped = new Date().toISOString();

    res.statusCode = 200;
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=600, stale-while-revalidate=1800",
    );
    return res.json({
      status: "Received",
      version: version,
      source: "https://github.com/nesaku/biblioreads",
      overdriveID: id,
      /* apiURL: apiURL, */
      title: data?.title || null,
      /* result: data, */
      lastScraped: lastScraped,
    });
  } catch (error) {
    res.statusCode = 500;
    return res.json({
      status: "Error - Unable to fetch Libby data",
      version: version,
      overdriveID: id,
      /* apiURL: apiURL, */
    });
  }
};

export default LibbyLink;
