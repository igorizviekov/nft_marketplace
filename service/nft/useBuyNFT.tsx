import React, { useMemo } from 'react';
import Web3Modal from 'web3modal';
import ethers from 'ethers';
import {
  CollectionsABI,
  MarketplaceABI,
  collectionsAddress,
  marketplaceAddress,
} from '../../mocks/constants.mock';
import { getErrMessage } from '../useMintNFT';
import { toast } from 'react-toastify';
import { getMarketplaceContract } from '../collection/utilts';
import useApproveMarketplace from '../marketplace/useApproveMarketplace';
const useBuyNFT = async (
  tokenID: number,
  collectionID: number,
  tokenURI: string
) => {
  try {
    const contract = await getMarketplaceContract();

    await useApproveMarketplace();

    let price;
    if (tokenID) {
      const tokenPrice = (await getPrice(tokenID)) || '';
      price = ethers.utils.parseUnits(tokenPrice.toString(), 'ether');
      const transaction = await contract.buyNFT(tokenID, 0, '', {
        value: price,
      });
      await transaction.wait();
    } else {
      //@TODO Change price for nft price
      price = ethers.utils.parseUnits('6.0', 'ether');
      const transaction = await contract.buyNFT(
        tokenID,
        collectionID,
        tokenURI,
        {
          value: price,
        }
      );

      const receipt = await transaction.wait();
      const TokenBoughtEvent = receipt.events?.find(
        (e: any) => e.event === 'NFTBought'
      );
      const TokenMintRequestEvent = receipt.event?.find(
        (e: any) => e.event === 'TokenMintRequest'
      );
      console.log({ receipt });
      console.log({ TokenBoughtEvent });

      if (TokenMintRequestEvent) {
        console.log({
          TokenMintRequestEvent: {
            requestId: Number(TokenMintRequestEvent.args[0]),
            buyer: TokenMintRequestEvent.args[1],
            tokenURI: TokenMintRequestEvent.args[2],
            price: ethers.utils.formatEther(TokenMintRequestEvent.args[3]),
          },
        });
      }
    }
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

const collectionContract = useMemo(
  () => new ethers.Contract(collectionsAddress, CollectionsABI, provider),
  []
);

const provider = useMemo(
  () =>
    new ethers.providers.JsonRpcProvider(
      'https://json-rpc.evm.testnet.shimmer.network'
    ),
  []
);
export default useBuyNFT;
