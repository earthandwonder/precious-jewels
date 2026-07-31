import type { NextConfig } from "next";

const basePath = "/p/rarest-gemstones";

const nextConfig: NextConfig = {
  basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
