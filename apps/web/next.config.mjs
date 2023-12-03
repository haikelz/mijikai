import withPWAInit from "@ducanh2912/next-pwa";

import "./src/env.mjs";

const withPWA = withPWAInit({ dest: "public" });

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  reactStrictMode: true,
  compress: true,
  images: {
    domains: ["avatars.githubusercontent.com", "lh3.googleusercontent.com"],
  },
  experimental: {
    webpackBuildWorker: true,
  },
});

export default nextConfig;
