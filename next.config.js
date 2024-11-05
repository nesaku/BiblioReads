/** @type {import('next').NextConfig} */

const { configureRuntimeEnv } = require("next-runtime-env/build/configure");

configureRuntimeEnv();

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

const nextConfig = withPWA({
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  async rewrites() {
    return [
      {
        source: "/img",
        destination: "https://wsrv.nl/",
      },
    ];
  },
});

module.exports = nextConfig;
