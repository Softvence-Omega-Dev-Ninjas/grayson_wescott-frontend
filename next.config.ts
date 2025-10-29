/** @type {import('next').NextConfig} */
import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '3mb',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'carbonengines.s3.us-east-2.amazonaws.com',
      },
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
