import React from 'react';
import { create as ipfsClient } from 'ipfs-http-client';

export const useIPFSImageUpload = async (image: File) => {
  const auth =
    'Basic ' +
    Buffer.from(
      `${process.env.NEXT_PUBLIC_INFURA_PROJECT_API_KEY}:${process.env.NEXT_PUBLIC_INFURA_SECRET}`
    ).toString('base64');
  const options = {
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    apiPath: '/api/v0',
    headers: {
      authorization: auth,
    },
  };

  try {
    const client = ipfsClient(options);

    const addedImage = await client.add({ content: image });
    //@TODO Add image url to profile on api
    console.log(`https://ipfs.io/ipfs/${addedImage.path}`);
  } catch (error) {
    console.error(error);
  }
};
