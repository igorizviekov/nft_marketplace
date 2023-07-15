import { ethers } from 'ethers';
import {
  CollectionsABI,
  MarketplaceABI,
  collectionsAddress,
} from '../../mocks/constants.mock';
import Web3Modal from 'web3modal';
import { marketplaceContract } from '../../scripts/utils';
import { MarketAddress } from '../../context/constants';
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
  const collectionContract = new ethers.Contract(
    MarketAddress,
    MarketplaceABI,
    signer
  );

  return collectionContract;
};
