import { ethers } from 'ethers';
import {
  CollectionsABI,
  MarketplaceABI,
  marketplaceAddress,
  collectionsAddress,
} from '../../mocks/constants.mock';
import Web3Modal from 'web3modal';
import csvParser from 'csv-parser';
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

export const parseCSVToJson = (csvData: File | null) => {
  return new Promise<any[]>((resolve) => {
    const results: any[] = [];

    const stream = csvParser();

    stream.on('data', (data) => {
      results.push(data);
    });

    stream.on('end', () => {
      resolve(results);
    });

    stream.write(csvData);
    stream.end();
  });
};
