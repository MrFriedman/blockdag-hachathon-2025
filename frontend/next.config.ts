// eslint-disable-next-line @typescript-eslint/no-var-requires
// eslint-disable-next-line @next/next/no-img-element
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint:{
    ignoreDuringBuilds:true,
  }
};

export default nextConfig;
