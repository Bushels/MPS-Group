/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const isVercel = process.env.VERCEL === '1';

const nextConfig = {
  // Configure for GitHub Pages deployment (production) vs local development
  output: isProd ? 'export' : undefined,
  basePath: isProd && !isVercel ? '/MPS-Group' : undefined,
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

module.exports = nextConfig;
