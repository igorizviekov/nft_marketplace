const process = require('process');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'ipfs.infura.io',
      `${process.env.NEXT_PUBLIC_INFURA_PROJECT_NAME}.infura-ipfs.io`,
      'lh3.googleusercontent.com',
    ],
  },
};

module.exports = nextConfig;
