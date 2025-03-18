/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
        pathname: '/gh/yy0691/img-bed@main/img/**',
      },
    ],
  },
}

module.exports = nextConfig 