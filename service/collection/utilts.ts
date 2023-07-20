import { ethers } from 'ethers';
import {
  CollectionsABI,
  MarketplaceABI,
  marketplaceAddress,
  collectionsAddress,
} from '../../mocks/constants.mock';
import Web3Modal from 'web3modal';
export const getCollectionContract = async (): Promise<ethers.Contract> => {
  const web3Modal = new Web3Modal();
  const connection = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  const signer = provider.getSigner();
  const collectionContract = new ethers.Contract(
    collectionsAddress,
    CollectionsABI,
    signer
  );

  return collectionContract;
};

export const getMarketplaceContract = async (): Promise<ethers.Contract> => {
  const web3Modal = new Web3Modal();
  const connection = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  const signer = provider.getSigner();
  const marketplaceContract = new ethers.Contract(
    marketplaceAddress,
    MarketplaceABI,
    signer
  );

  return marketplaceContract;
};
