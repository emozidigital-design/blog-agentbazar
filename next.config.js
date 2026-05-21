/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['isomorphic-dompurify'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http', hostname: '**' },
    ],
  },
}
module.exports = nextConfig
