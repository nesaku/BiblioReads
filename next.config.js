/** @type {import('next').NextConfig} */

const { configureRuntimeEnv } = require("next-runtime-env/build/configure");

configureRuntimeEnv();

const withSerwist = require("@serwist/next").default({
  swSrc: "service-worker.js",
  swDest: "public/sw.js",
  register: true,
  disable: process.env.NODE_ENV === "development",
});

const nextConfig = withSerwist({
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/img",
        destination:
          process.env.IMAGE_PROXY === "next"
            ? "/api/image-proxy"
            : "https://wsrv.nl/",
      },
    ];
  },
});

module.exports = nextConfig;
