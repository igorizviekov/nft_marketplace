import React from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import { MarketplaceABI, marketplaceAddress } from '../../mocks/constants.mock';
import { getErrMessage } from '../useMintNFT';
import { toast } from 'react-toastify';
import { getMarketplaceContract } from '../collection/utilts';

const useDelistNFT = async (
  tokenID: number,
  setListedNFT: (listedNFT: boolean) => void
) => {
  try {
    const contract = await getMarketplaceContract();

    const tx = await contract.delistNFT(tokenID);

    console.log('Transaction sent:', tx.hash);
    await tx.wait();
    console.log('Transaction mined');
    setListedNFT(false);
  } catch (err) {
    console.log({ err });
    const message = getErrMessage(err);
    toast.error(message);
  }
};

export default useDelistNFT;
