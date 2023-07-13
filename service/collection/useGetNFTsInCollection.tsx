import { getErrMessage } from '../useMintNFT';
import { toast } from 'react-toastify';
import { BigNumber } from 'ethers';
import axios from 'axios';
import { ethers } from 'ethers';
import { getCollectionContract } from './utilts';

const useGetNFTsInCollection = async (
  collectionID: number,
  startIndex: number,
  pageSize: number
) => {
  const collectionContract = await getCollectionContract();

  try {
    const tokenIDs = await collectionContract.getNFTsInCollection(
      collectionID,
      startIndex,
      pageSize
    );
    const tokenDataPromises = tokenIDs.map(async (tokenId: BigNumber) => {
      const tokenURI = await collectionContract.tokenURI(tokenId);
      const price = await collectionContract.getPrice(tokenId);

      const owner = await collectionContract.ownerOf(tokenId);
      const { data } = await axios.get(tokenURI);

      return {
        uri: tokenURI,
        metadata: data,
        price: ethers.utils.formatUnits(price.toString(), 'ether'),
        owner: owner,
        id: Number(tokenId),
      };
    });

    const tokensData = await Promise.all(tokenDataPromises);

    return tokensData;
  } catch (err) {
    const message = getErrMessage(err);
    toast.error(message);
  }
};

export default useGetNFTsInCollection;
