import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/kycflow-website",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
