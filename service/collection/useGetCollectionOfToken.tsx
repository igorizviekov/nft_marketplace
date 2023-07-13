import React from 'react';
import { getCollectionContract } from './utilts';
import axios from 'axios';
import { getErrMessage } from '../useMintNFT';
import { error } from 'console';
import { toast } from 'react-toastify';

const useGetCollectionOfToken = async (id: number) => {
  try {
    const collectionContract = await getCollectionContract();
    const tx = collectionContract.getCollectionOfToken(id);
    const { data } = await axios.get(tx[0]);

    const collection = {
      metadata: data,
      id: tx[1].toNumber(),
      owner: tx[2],
    };

    return collection;
  } catch (error) {
    const message = getErrMessage(error);
    toast.error(message);
  }
};

export default useGetCollectionOfToken;
