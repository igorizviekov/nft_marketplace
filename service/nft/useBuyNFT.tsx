import { ethers } from 'ethers';
import { getErrMessage } from '../useMintNFT';
import { toast } from 'react-toastify';
import {
  getCollectionContract,
  getMarketplaceContract,
} from '../collection/utilts';

const useBuyNFT = async (
  tokenID: number,
  collectionID: number,
  tokenURI: string,
) => {
  try {
    const contract = await getMarketplaceContract();
    const collectionContract = await getCollectionContract();

    let price;
    if (tokenID) {
      const tokenPrice = (await getPrice(tokenID, collectionContract)) || '';
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

const getPrice = async (
  tokenId: number,
  collectionContract: ethers.Contract
) => {
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
export default useBuyNFT;
