import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  // allowedDevOrigins: ['http://192.168.150.105:3000'],
}

export default nextConfig
