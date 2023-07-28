import { toast } from 'react-toastify';
import { ethers } from 'ethers';
import axios from 'axios';
import { INFTGeneralInfo, Trait } from '../store/model/nft-mint/nft-mint.types';
import { useIPFSImageUpload } from './useIPFSImageUpload';
import useIPFSJSONUpload from './useIPFSJSONUpload';
import { NextRouter } from 'next/router';
import { IShimmerNFT } from '../components/ui/NFTCard/ShimmerNFTCard.types';
import { getCollectionContract } from './collection/utilts';
import { ICollection } from '../store/model/app/app.types';

const useMintNFT = async (
  nftGeneralInfo: INFTGeneralInfo,
  traits: Trait[],
  setIsLoading: (loaded: boolean) => void,
  collection: ICollection,
  nftPrice: number,
  mintAddress: string,
  editGeneralInformation: (nftGeneralInfo: INFTGeneralInfo) => void,
  resetTraits: () => void,
  router: NextRouter,
  setNFT: (nft: IShimmerNFT) => void
) => {
  console.log(collection);
  setIsLoading(true);
  const uploadedImage = await useIPFSImageUpload(nftGeneralInfo.image);

  const metadata = JSON.stringify({
    name: nftGeneralInfo.name,
    description: nftGeneralInfo.description,
    price: nftGeneralInfo.price,
    image: uploadedImage,
    traits: traits,
    tokenStandard: 'ERC721',
    collection: {
      id: collection.tokenId,
      category_primary: collection.categoryPrimary,
      category_secondary: collection.categorySecondary,
      description: collection.description,
      name: collection.name,
      symbol: collection.symbol,
      website: collection.website,
      owner: collection.contract_address,
    },
  });

  const tokenURI = await useIPFSJSONUpload(metadata);
  try {
    //getcontract
    const contract = await getCollectionContract();
    const price = ethers.utils.parseUnits(nftPrice.toString(), 'ether');

    //mint
    const tx = await contract.mint(collection.tokenId, tokenURI, price);
    const receipt = await tx.wait();
    const tokenMintedEvent = receipt.events?.find(
      (e: any) => e.event === 'TokenMinted'
    );

    if (tokenMintedEvent) {
      const newTokenID = Number(tokenMintedEvent.args?.tokenId);
      console.log('collection contract', contract);
      console.log('newTokenID', newTokenID);

      const date = new Date();
      axios
        .post(`${process.env.NEXT_PUBLIC_API_KEY}/nft-logs`, {
          image_uri: uploadedImage,
          nft_id: newTokenID.toString(),
          transaction_type: 'listing',
          seller_address: '',
          buyer_address: mintAddress,
          token_value: price.toString(),
          date: date.toString(),
        })
        .then((response) => console.log(response, 'nft-logs reponse'))
        .catch((e) => console.error(e.message));

      editGeneralInformation({
        image: null,
        name: '',
        description: '',
        price: 0,
        collection: '',
      });
      resetTraits();

      const newNFT: IShimmerNFT = {
        id: newTokenID,
        name: nftGeneralInfo.name,
        uri: tokenURI,
        owner: mintAddress,
        metadata: {
          name: nftGeneralInfo.name,
          description: nftGeneralInfo.description,
          price: nftGeneralInfo.price.toString(),
          image: uploadedImage,
          traits: traits,
          tokenStandard: 'ERC721',
          collection: {
            id: collection.tokenId,
            category_primary: collection.categoryPrimary,
            category_secondary: collection.categorySecondary,
            description: collection.description,
            name: collection.name,
            symbol: collection.symbol,
            website: collection.website,
            owner: collection.owner,
            contract_address: collection.contract_address,
          },
        },
      };
      setNFT(newNFT);
      router.push(`/nft/${nftGeneralInfo.name}`);
    } else {
      console.error('Token Minted event not found in receipt');
    }

    setNFT;
    router.push(`/nft/${nftGeneralInfo.name}`);
  } catch (error) {
    console.log({ error });
    const message = getErrMessage(error);
    toast.error(message);
  } finally {
    setIsLoading(false);
  }
};
export const getErrMessage = (err: any) => err?.reason || 'Error...';
export default useMintNFT;
