import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Sanity already serves resized/format-optimized assets. Bypass Vercel's
    // paid image optimizer so new uploads load directly from the Sanity CDN.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
