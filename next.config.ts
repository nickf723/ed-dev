/** @type {import('next').Config} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        port: '',
        pathname: '/**', 
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com', // Needed for PokéAPI sprites!
        port: '',
        pathname: '/**', 
      },
      {
        protocol: 'https',
        hostname: 'www.transparenttextures.com', // For the space background pattern on the Super Mario Galaxy page
        port: '',
        pathname: '/**', 
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // For the hero image on the Ludology page
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'nintendo.fandom.com', // For the Gusty Garden Galaxy image on the Super Mario Galaxy page
        port: '',
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;