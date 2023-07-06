import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import { fetchContract } from '../utils';
import { useRouter } from 'next/router';
import { create as ipfsClient } from 'ipfs-http-client';
import { INFTGeneralInfo } from '../store/model/nft-mint/nft-mint.types';
import { toast } from 'react-toastify';
import useMintNFT from '../service/useMintNFT';
import { marketplaceAddress } from '../mocks/constants.mock';
import { useMemo } from 'react';

/**
 *
 * Write NFT data to blockchain
 *
 * @param uploadedFileUrl
 * @param nftPrice
 */
export const createSale = async (uploadedFileUrl: string, nftPrice: number) => {
  // https://www.npmjs.com/package/web3modal
  const we3Modal = new Web3Modal();
  const connection = await we3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);

  /**
   * Person who is creating an NFT
   */
  const signer = provider.getSigner();
  /**
   * Get access to the Solidity Smart Contract api
   */
  const contract = fetchContract(signer);
  /**
   * Convert price value from the form input to the blockchain readable format
   */
  const price = ethers.utils.parseUnits(nftPrice.toString(), 'ether');
  const listingPrice = await contract.getListingPrice();

  const transaction = await contract.createToken(price, uploadedFileUrl, {
    value: listingPrice,
  });

  // should trigger metamask popup
  await transaction.wait();
};

export const covertImageToNFT = async (
  nftGeneralInfo: INFTGeneralInfo,
  setIsLoading: (loaded: boolean) => void
) => {
  try {
    const { name, price, description, image } = nftGeneralInfo;
    /**
     * Authenticate to Infura
     *
     * https://app.infura.io/
     * https://ipfs.tech/
     */
    const auth =
      'Basic ' +
      Buffer.from(
        `${process.env.NEXT_PUBLIC_INFURA_PROJECT_ID}:${process.env.NEXT_PUBLIC_INFURA_SECRET}`
      ).toString('base64');

    const router = useRouter();
    const options = {
      url: 'https://ipfs.infura.io:5001/api/v0',
      host: 'ipfs.infura.io',
      port: 5001,
      protocol: 'https',
      apiPath: '/api/v0',
      headers: {
        authorization: auth,
      },
    };

    const client = ipfsClient(options);

    /**
     * Upload file to Infura
     */
    const addedImage = await client.add({ content: image });

    /**
     * Upload NFT data to Infura
     */
    const data = JSON.stringify({
      name,
      price,
      description,
      // url of Infura project plus id of uploaded image
      image: `https://${process.env.NEXT_PUBLIC_INFURA_PROJECT_NAME}.infura-ipfs.io/ipfs/${addedImage.path}`,
    });
    /**
     * Upload file to Infura
     */
    const addedNFT = await client.add(data);
    /**
     * Save NFT data on Polygon with Smart Contract
     */
    await createSale(
      `https://${process.env.NEXT_PUBLIC_INFURA_PROJECT_NAME}.infura-ipfs.io/ipfs/${addedNFT.path}`,
      price
    );
    setTimeout(() => router.push('/'), 2000);
  } catch (err) {
    console.log('Failed to upload NFT to ipfs', err);
    setIsLoading(false);
  }
};

export const submitNewNFT = async (
  nftGeneralInfo: INFTGeneralInfo,
  setIsLoading: (loaded: boolean) => void,
  collectionContract: any
) => {
  //@TODO CLEAR NFT MINT STATE UPON SUCCESS
  setIsLoading(true);
  covertImageToNFT(nftGeneralInfo, setIsLoading)
    .then(async (response) => {
      console.log(response);
      await useMintNFT(1, collectionContract);
      toast.success('NFT Created successfully');
    })
    .catch((error) => console.error(error))
    .finally(() => {
      setIsLoading(false);
    });
};
