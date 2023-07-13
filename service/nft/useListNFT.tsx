import React from 'react';
import Web3Modal from 'web3modal';
import ethers from 'ethers';
import { MarketplaceABI, marketplaceAddress } from '../../mocks/constants.mock';
import { getErrMessage } from '../useMintNFT';
import { toast } from 'react-toastify';
const useListNFT = async (tokenID: number, newPrice: number) => {
  try {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      marketplaceAddress,
      MarketplaceABI,
      signer
    );

    const price = ethers.utils.parseUnits(newPrice.toString(), 'ether');

    const tx = await contract.listNFT(tokenID, price);

    console.log('Transaction sent:', tx.hash);
    await tx.wait();
    console.log('Transaction mined');
  } catch (err) {
    console.log({ err });
    const message = getErrMessage(err);
    toast.error(message);
  }
};

export default useListNFT;
