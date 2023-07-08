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
import useIPFSJSONUpload from '../service/useIPFSJSONUpload';
import { useIPFSImageUpload } from '../service/useIPFSImageUpload';

export const submitNewNFT = async (
  nftGeneralInfo: INFTGeneralInfo,
  setIsLoading: (loaded: boolean) => void,
  collectionContract: any
) => {
  //@TODO CLEAR NFT MINT STATE UPON SUCCESS
  setIsLoading(true);

  const uploadedImage = await useIPFSImageUpload(nftGeneralInfo.image);

  const metadata = JSON.stringify({
    name: nftGeneralInfo.name,
    description: nftGeneralInfo.description,
    price: nftGeneralInfo.price,
    image: uploadedImage,
  });

  const uploadedMetadata = await useIPFSJSONUpload(metadata);

  await useMintNFT(
    1,
    collectionContract,
    uploadedMetadata,
    nftGeneralInfo.price
  ).finally(() => setIsLoading(false));
};
