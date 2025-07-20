/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
  images: {
    unoptimized: true, // Optional: helps avoid image issues on static sites
  },
  basePath: '/CricoBeat1.0',
  assetPrefix: '/CricoBeat1.0',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
