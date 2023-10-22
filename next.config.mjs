import withPWAInit from "@ducanh2912/next-pwa";

import "./src/env.mjs";

/** @type {import('next').NextConfig} */
const withPWA = withPWAInit({ dest: "public" });

const nextConfig = withPWA({
  reactStrictMode: true,
  compress: true,
  images: {
    domains: ["avatars.githubusercontent.com", "lh3.googleusercontent.com"],
  },
});

export default nextConfig;
