import withPWAInit from "@ducanh2912/next-pwa";

import "./src/env.mjs";

const withPWA = withPWAInit({ dest: "public" });

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  reactStrictMode: true,
  compress: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "**",
      },
    ],
  },
  experimental: {
    webpackBuildWorker: true,
    optimizePackageImports: ["@radix-ui/*"],
  },
});

export default nextConfig;
