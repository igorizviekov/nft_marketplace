import React from 'react';
import { getCollectionContract } from './utilts';
import { getErrMessage } from '../useMintNFT';
import { toast } from 'react-toastify';

const useGetCollectionOwner = async (collectionID: number) => {
  const collectionContract = await getCollectionContract();
  try {
    const tx = await collectionContract.getCollectionOwner(collectionID);
    return tx;
  } catch (error) {
    const message = getErrMessage(error);
    toast.error(message);
  }
};

export default useGetCollectionOwner;
