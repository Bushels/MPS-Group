/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/MPS-Group',
  reactStrictMode: true,
  images: {
    unoptimized: true, // Required for static export
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  typescript: {
    // Ensures build fails on type errors
    ignoreBuildErrors: false,
  },
};

module.exports = nextConfig;
