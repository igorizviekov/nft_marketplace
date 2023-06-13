const process = require('process');
const withTm = require('next-transpile-modules')(['react-accordion-ts']);
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'ipfs.infura.io',
      'ipfs.io',
      `${process.env.NEXT_PUBLIC_INFURA_PROJECT_NAME}.infura-ipfs.io`,
      'lh3.googleusercontent.com',
      'd7hftxdivxxvm.cloudfront.net',
      'media.istockphoto.com',
      'img.freepik.com',
      'i.imgur.com',
      'imgur.com',
      'cryptoslate.com',
      'metadata.ens.domains',
      'i.seadn.io',
      'res.cloudinary.com',
      'nft-cdn.alchemy.com',
    ],
  },
};

module.exports = withTm({ ...nextConfig });
