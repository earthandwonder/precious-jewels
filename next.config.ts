import type { NextConfig } from "next";

const basePath = "/p/abundant-gems";

const nextConfig: NextConfig = {
  basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
