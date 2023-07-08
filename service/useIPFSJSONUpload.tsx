import React from 'react';
import { create as ipfsClient } from 'ipfs-http-client';

const useIPFSJSONUpload = async (
  metadata: any
): Promise<string | undefined> => {
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
    const addedMetadata = await client.add({ content: metadata });

    return `https://ipfs.io/ipfs/${addedMetadata.path}`;
  } catch (error) {
    console.error(error);
  }
};

export default useIPFSJSONUpload;
