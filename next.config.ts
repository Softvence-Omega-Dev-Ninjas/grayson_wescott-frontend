import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // allow any https domain
      },
      {
        protocol: 'http',
        hostname: '**', // allow any http domain
      },
    ],
  },
};

export default nextConfig;
