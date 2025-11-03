import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,

  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
      allowedOrigins: ['*']
    }
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'openai.com'
      }
    ],
    formats: ['image/webp'],
    minimumCacheTTL: 60
  },
  env: {
    NEXT_PUBLIC_APP_NAME: 'Gorilla AI'
  }
  /* config options here */
}

export default nextConfig