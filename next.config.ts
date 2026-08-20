import type { NextConfig } from 'next';

const isDevelopment = process.env.NODE_ENV === 'development';
const isPreview = process.env.VERCEL_ENV === 'preview';

const nextConfig: NextConfig = {
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
  images: {
    // Local development and deliberate Preview deployments should not spend
    // Vercel Image Optimization transformations. Production keeps optimization.
    unoptimized: isDevelopment || isPreview,
    minimumCacheTTL: 2_678_400,
    formats: ['image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.transparenttextures.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'nintendo.fandom.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
