import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF first (smallest), WebP fallback for browsers without AVIF support
    formats: ["image/avif", "image/webp"],
    // Listing photos rarely change, so keep optimized copies for 31 days instead of 4 hours
    minimumCacheTTL: 2678400,
    // Listing photos are served from the dealership's existing WordPress media library
    remotePatterns: [
      new URL("https://familyhomecentercrestview.com/wp-content/uploads/**"),
      // Google reviewer profile photos
      new URL("https://lh3.googleusercontent.com/**"),
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Browsers that have visited once always use HTTPS for the next two years
          { key: "Strict-Transport-Security", value: "max-age=63072000" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
