/** @type {import('next').NextConfig} */

const { configureRuntimeEnv } = require("next-runtime-env/build/configure");

configureRuntimeEnv();

const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  register: true,
  disable: process.env.NODE_ENV === "development",
});

const nextConfig = withPWA({
  reactStrictMode: true,
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
