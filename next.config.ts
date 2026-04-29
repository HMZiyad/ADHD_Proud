import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: 'export', // Removed to allow dynamic routes (e.g., /products/[id]) to build without generateStaticParams
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
      },
    ],
  },
};

export default nextConfig;
