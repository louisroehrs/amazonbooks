/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    // Remove appDir as it's now stable in Next.js 14
  },
}

module.exports = nextConfig 