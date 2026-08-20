import type { NextConfig } from 'next';

const isDevelopment = process.env.NODE_ENV === 'development';
const isPreview = process.env.VERCEL_ENV === 'preview';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/interdisciplines/game-studies/science',
        destination: '/humanities/gaming/ludology/lab',
        permanent: true,
      },
      {
        source: '/interdisciplines/game-studies/library/board-games',
        destination: '/humanities/gaming/repository/board-games',
        permanent: true,
      },
      {
        source: '/interdisciplines/game-studies/library/board-games/:slug',
        destination: '/humanities/gaming/repository/board-games/:slug',
        permanent: true,
      },
      {
        source: '/interdisciplines/game-studies/library/magic-the-gathering',
        destination: '/humanities/gaming/repository/magic-the-gathering',
        permanent: true,
      },
      {
        source: '/interdisciplines/game-studies/library/magic-the-gathering/:path*',
        destination: '/humanities/gaming/repository/magic-the-gathering/:path*',
        permanent: true,
      },
    ];
  },
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
        hostname: 'cards.scryfall.io',
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
