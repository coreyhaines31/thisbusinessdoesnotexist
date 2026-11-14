import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.thisbusinessdoesnotexist.com" }],
        destination: "https://thisbusinessdoesnotexist.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
