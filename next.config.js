/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
    formats: ['image/avif', 'image/webp'],
  },
  typescript: {
    // Ensures build fails on type errors
    ignoreBuildErrors: false,
  },
  eslint: {
    // Ensures build fails on ESLint errors
    ignoreDuringBuilds: false,
  },
}

module.exports = nextConfig
