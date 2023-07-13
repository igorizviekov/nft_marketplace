import React from 'react';
import { getCollectionContract } from './utilts';
import { getErrMessage } from '../useMintNFT';
import { toast } from 'react-toastify';
import axios from 'axios';

const useGetSingleCollection = async (id: number) => {
  try {
    const collectionContract = await getCollectionContract();

    const tx = await collectionContract.getCollection(id);
    const { data } = await axios.get(tx[0]);

    const collection = {
      metadata: data,
      id: tx[1].toNumber(),
      owner: tx[2],
    };

    console.log({ collection });
    return collection;
  } catch (err) {
    const error = getErrMessage(err);
    toast.error(error);
  }
};

export default useGetSingleCollection;
