import axios from 'axios';
import { getErrMessage } from '../useMintNFT';
import { toast } from 'react-toastify';
import { ethers } from 'ethers';
import { getCollectionContract } from './utilts';

const useGetCollectionOfToken = async (id: number) => {
  try {
    const contract = await getCollectionContract();
    const tx = await contract.getCollectionOfToken(id);
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
