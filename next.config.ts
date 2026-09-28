import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Listing photos are served from the dealership's existing WordPress media library
    remotePatterns: [new URL("https://familyhomecentercrestview.com/wp-content/uploads/**")],
  },
};

export default nextConfig;
