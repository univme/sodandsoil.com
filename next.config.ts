import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "static.wixstatic.com", pathname: "/media/**" },
      { protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" },
    ],
    minimumCacheTTL: 86400,
  },
};
export default nextConfig;
