import React, { useEffect, useMemo, useState } from 'react';
import { Button } from '../../components/ui/Button';
import styles from '../../styles/pages/CreateNFTPage.module.scss';
import classNames from 'classnames';
import { toast } from 'react-toastify';

import { BigNumber, ethers } from 'ethers';
import {
  marketplaceAddress,
  collectionsAddress,
  CollectionsABI,
  MarketplaceABI,
  mockTokenURI,
  mockCollectionURI,
} from './constants/constants';
import axios from 'axios';
import Web3Modal from 'web3modal';
import { Header } from '../../components';

const ContractSandbox = () => {
  const provider = useMemo(
    () =>
      new ethers.providers.JsonRpcProvider(
        'https://json-rpc.evm.testnet.shimmer.network'
      ),
    []
  );

  const getErrMessage = (err) => err?.reason || 'Error...';

  const collectionContract = useMemo(() => {
    return new ethers.Contract(collectionsAddress, CollectionsABI, provider);
  }, []);

  const marketplaceContract = useMemo(() => {
    return new ethers.Contract(marketplaceAddress, MarketplaceABI, provider);
  }, []);

  const getCollectionById = async (id: number) => {
    try {
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
      console.log({ err });
      const message = getErrMessage(err);
      toast.error(message);
    }
  };

  const getCollectionOfToken = async (id: number) => {
    try {
      const tx = await collectionContract.getCollectionOfToken(id);
      const { data } = await axios.get(tx[0]);

      const collection = {
        metadata: data,
        id: tx[1].toNumber(),
        owner: tx[2],
      };
      console.log(collection);
      return collection;
    } catch (err) {
      console.log({ err });
      const message = getErrMessage(err);
      toast.error(message);
    }
  };

  const getNFTsInCollection = async (
    collectionId: number,
    startIndex: number,
    pageSize: number
  ) => {
    try {
      const tokenIds = await collectionContract.getNFTsInCollection(
        collectionId,
        startIndex,
        pageSize
      );

      const tokenDataPromises = tokenIds.map(async (tokenId: BigNumber) => {
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

      console.log({ nfts: tokensData });
      return tokensData;
    } catch (err) {
      console.log({ err });
      const message = getErrMessage(err);
      toast.error(message);
    }
  };

  const getPrice = async (tokenId: number) => {
    try {
      const tx = await collectionContract.getPrice(tokenId);
      const tokenPrice = ethers.utils.formatEther(tx);
      console.log({ tokenPrice });
      return tokenPrice;
    } catch (err) {
      console.log({ err });
      const message = getErrMessage(err);
      toast.error(message);
    }
  };

  const mintNFT = async (collectionId: number, tokenURI = mockTokenURI) => {
    try {
      // get a collection where to mint
      const collection = await getCollectionById(collectionId);
      if (!collection) {
        return;
      }
      const nftPrice = 1;

      // get contract
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        collectionsAddress,
        CollectionsABI,
        signer
      );
      const price = ethers.utils.parseUnits(nftPrice.toString(), 'ether');

      // mint
      const tx = await contract.mint(collection.id, tokenURI, price);
      const receipt = await tx.wait();
      console.log({ receipt });

      const TokenMintedEvent = receipt.events?.find(
        (e) => e.event === 'TokenMinted'
      );
      console.log({ TokenMintedEvent });
      if (TokenMintedEvent) {
        const newTokenId = TokenMintedEvent.args?.tokenId;
        console.log('New token ID:', newTokenId);
      } else {
        console.error('TokenMinted event not found in receipt');
      }
    } catch (err) {
      console.log({ err });
      const message = getErrMessage(err);
      toast.error(message);
    }
  };

  const createCollection = async (uri: string) => {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        collectionsAddress,
        CollectionsABI,
        signer
      );

      const tx = await contract.createCollection(uri);
      const receipt = await tx.wait();
      console.log({ receipt });
      // console.log({ ID: Number(receipt.args.id) });

      const CollectionCreatedEvent = receipt.events?.find(
        (e) => e.event === 'CollectionCreated'
      );
      console.log({ CollectionCreatedEvent });
      const collectionId = Number(CollectionCreatedEvent?.args?.[0]);
      console.log({ collectionId });
    } catch (err) {
      console.log({ err });
      const message = getErrMessage(err);
      toast.error(message);
    }
  };

  const setPrice = async (tokenId: number, newPrice: number) => {
    try {
      // get contract
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        collectionsAddress,
        CollectionsABI,
        signer
      );
      const price = ethers.utils.parseUnits(newPrice.toString(), 'ether');

      const tx = await contract.setPrice(tokenId, price);
      const receipt = await tx.wait();
      console.log({ receipt });

      const PriceSetEvent = receipt.events?.find((e) => e.event === 'PriceSet');
      console.log({ PriceSetEvent });
    } catch (err) {
      console.log({ err });
      const message = getErrMessage(err);
      toast.error(message);
    }
  };

  const setMarketplace = async () => {
    try {
      // get contract
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        collectionsAddress,
        CollectionsABI,
        signer
      );
      const tx = await contract.setMarketplace(
        '0xc0Bb1650A8eA5dDF81998f17B5319afD656f4c11'
      );
      const receipt = await tx.wait();
      console.log({ receipt });
    } catch (err) {
      const message = getErrMessage(err);
      toast.error(message);
    }
  };
  useEffect(() => {
    console.log({ collectionContract });
    console.log({ marketplaceContract });
  }, []);

  return (
    <div className="w-full ml-auto overflow-auto ">
      <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white flex left-0 sticky">
        Collections
      </h1>
      <div className="flex gap-2 mb-5">
        <Button
          isPrimary
          label="createCollection"
          disabled={false}
          onClick={() => createCollection(mockCollectionURI)}
        />
        <Button
          isPrimary
          label="Get public collection"
          disabled={false}
          onClick={() => getCollectionById(1)}
        />
        <Button
          isPrimary
          label="getCollection"
          disabled={false}
          onClick={() => {
            const collectionId = window.prompt(
              'Please enter the collection ID:'
            );
            if (collectionId !== null) {
              const id = Number(collectionId);
              // Call your contract function
              if (!isNaN(id)) {
                getCollectionById(id);
              } else {
                toast.error('Invalid collection ID. Please try again.');
              }
            }
          }}
        />
        <Button
          isPrimary
          label="getCollectionOfToken"
          disabled={false}
          onClick={() => {
            const tokenId = window.prompt('Please enter the Token ID:');
            if (tokenId !== null) {
              const id = Number(tokenId);
              // Call your contract function
              if (!isNaN(id)) {
                getCollectionOfToken(id);
              } else {
                toast.error('Invalid token ID. Please try again.');
              }
            }
          }}
        />
        <Button
          isPrimary
          label="getNFTsInCollection"
          disabled={false}
          onClick={() => {
            const collectionId = window.prompt(
              'Please enter the collection ID:'
            );
            if (collectionId !== null) {
              const id = Number(collectionId);
              // Call your contract function
              if (!isNaN(id)) {
                getNFTsInCollection(id, 0, 100);
              } else {
                toast.error('Invalid collection ID. Please try again.');
              }
            }
          }}
        />
        <Button
          isPrimary
          label="getPrice"
          disabled={false}
          onClick={() => {
            const collectionId = window.prompt('Please enter the token ID:');
            if (collectionId !== null) {
              const id = Number(collectionId);
              // Call your contract function
              if (!isNaN(id)) {
                getPrice(id);
              } else {
                toast.error('Invalid token ID. Please try again.');
              }
            }
          }}
        />
        <Button
          isPrimary
          label="setPrice"
          disabled={false}
          onClick={() => {
            const collectionId = window.prompt('Please enter the token ID:');
            if (collectionId !== null) {
              const id = Number(collectionId);
              // Call your contract function
              if (!isNaN(id)) {
                setPrice(id, 5);
              } else {
                toast.error('Invalid token ID. Please try again.');
              }
            }
          }}
        />
        <Button
          isPrimary
          label="Mint NFT"
          disabled={false}
          onClick={() => {
            const collectionId = window.prompt(
              'Please enter the collection ID:'
            );
            if (collectionId !== null) {
              const id = Number(collectionId);
              // Call your contract function
              if (!isNaN(id)) {
                mintNFT(id);
              } else {
                toast.error('Invalid collection ID. Please try again.');
              }
            }
          }}
        />
        <Button
          isPrimary
          label="setMarketplace"
          disabled={false}
          onClick={setMarketplace}
        />
      </div>
      <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white flex left-0 sticky">
        Marketplace
      </h1>
      <div className="flex gap-2 mb-5">
        <Button
          isPrimary
          label="hellow"
          disabled={false}
          onClick={() => null}
        />
      </div>
    </div>
  );
};

export default ContractSandbox;
