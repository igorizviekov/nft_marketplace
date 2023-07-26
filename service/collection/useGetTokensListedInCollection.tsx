import React from 'react';
import Web3Modal from 'web3modal';
import { getCollectionContract, getMarketplaceContract } from './utilts';
import { BigNumber, ethers } from 'ethers';
import axios from 'axios';
import { getErrMessage } from '../useMintNFT';
import { toast } from 'react-toastify';
import { useStoreActions } from '../../store';
import { IShimmerNFT } from '../../components/ui/NFTCard/ShimmerNFTCard.types';
const useGetTokensListedInCollection = async (
  collectionID: number,
  isForWallet: boolean
) => {
  const { setShimmerListedNFTS } = useStoreActions(
    (actions) => actions.listedNFTS
  );
  const startIndex = 0;
  const pageSize = 20;
  try {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const marketplaceContract = await getMarketplaceContract();

    const collectionContract = await getCollectionContract();

    const yourAddress = await signer.getAddress();
    const tokenIds = await marketplaceContract.getListedTokensInCollection(
      collectionID,
      startIndex,
      pageSize
    );
    const tokenDataPromises = tokenIds.map(async (tokenId: BigNumber) => {
      const tokenURI = await collectionContract.tokenURI(tokenId);
      const price = await collectionContract.getPrice(tokenId);
      const owner = await collectionContract.ownerOf(tokenId);
      if (isForWallet && owner !== yourAddress) {
        return;
      }
      const { data } = await axios.get(tokenURI);
      return {
        uri: tokenURI,
        metadata: data,
        price: ethers.utils.formatUnits(price.toString(), 'ether'),
        owner: owner,
        id: Number(tokenId),
      };
    });

    const tokensData = (await Promise.all(tokenDataPromises)).filter(Boolean);

    console.log({ nfts: tokensData });
    setShimmerListedNFTS(tokensData as IShimmerNFT[]);
  } catch (err) {
    console.log({ err });
    const message = getErrMessage(err);
    toast.error(message);
  }
};
export default useGetTokensListedInCollection;
