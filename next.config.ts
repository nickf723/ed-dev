/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.wikitide.net',
        port: '',
        pathname: '/**', // This allows any path under this domain
      },
      // You can add more trusted domains here in the future!
    ],
  },
};

export default nextConfig;