import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This will allow the Images from any domain to be rendered
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
    dangerouslyAllowSVG: true,
  },
  experimental: {
    ppr: "incremental",
    after: true,
  },
  devIndicators: {
    appIsrStatus: true,
    buildActivity: true,
    buildActivityPosition: "bottom-right",
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
