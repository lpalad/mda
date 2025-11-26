/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: '/analytics',
  assetPrefix: '/analytics',
  trailingSlash: true,
};

module.exports = nextConfig;
