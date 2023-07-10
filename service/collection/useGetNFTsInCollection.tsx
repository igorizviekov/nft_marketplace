import React from 'react';
import { getErrMessage } from '../useMintNFT';
import { toast } from 'react-toastify';
import { BigNumber } from 'ethers';
import axios from 'axios';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import { CollectionsABI, collectionsAddress } from '../../mocks/constants.mock';

const useGetNFTsInCollection = async (
  collectionID: number,
  startIndex: number,
  pageSize: number
) => {
  const web3Modal = new Web3Modal();
  const connection = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  const signer = provider.getSigner();
  const collectionContract = new ethers.Contract(
    collectionsAddress,
    CollectionsABI,
    signer
  );
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
