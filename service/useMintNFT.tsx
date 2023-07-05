import React, { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import { BigNumber, ethers } from 'ethers';
import {
  marketplaceAddress,
  collectionsAddress,
  CollectionsABI,
  MarketplaceABI,
  mockTokenURI,
  mockCollectionURI,
} from '../mocks/constants.mock';
import axios from 'axios';
import Web3Modal from 'web3modal';

const useMintNFT = async (collectionID: number, tokenURI = mockTokenURI) => {
  try {
    const collection = await getCollectionById(collectionID);

    if (!collection) return;

    const nftPrice = 1;

    //getcontract

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

    //mint
    const tx = await contract.mint(collection.id, tokenURI, price);
    const receipt = await tx.wait();
    console.log({ receipt });

    const tokenMintedEvent = receipt.events?.find(
      (e: any) => e.event === 'TokenMinted'
    );

    console.log({ tokenMintedEvent });

    if (tokenMintedEvent) {
      const newTokenID = Number(tokenMintedEvent.args?.tokenId);
      console.log('newTokenID', newTokenID);
    } else {
      console.error('Token Minted event not found in receipt');
    }
  } catch (error) {
    console.log({ error });
    const message = getErrMessage(error);
    toast.error(message);
  }
};

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

const provider = useMemo(() => {
  return new ethers.providers.JsonRpcProvider(
    'https://json-rpc.evm.testnet.shimmer.network'
  );
}, []);

const collectionContract = useMemo(() => {
  return new ethers.Contract(collectionsAddress, CollectionsABI, provider);
}, []);

const getErrMessage = (err: any) => err?.reason || 'Error...';
export default useMintNFT;
