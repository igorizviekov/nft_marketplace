import { toast } from 'react-toastify';

import { ethers } from 'ethers';
import { collectionsAddress, CollectionsABI } from '../mocks/constants.mock';
import axios from 'axios';
import Web3Modal from 'web3modal';
import { INFTGeneralInfo } from '../store/model/nft-mint/nft-mint.types';
import { useIPFSImageUpload } from './useIPFSImageUpload';
import useIPFSJSONUpload from './useIPFSJSONUpload';

const useMintNFT = async (
  nftGeneralInfo: INFTGeneralInfo,
  setIsLoading: (loaded: boolean) => void,
  collectionID: number,
  collectionContract: ethers.Contract,
  nftPrice: number,
  mintAddress: string,
  editGeneralInformation: (nftGeneralInfo: INFTGeneralInfo) => void
) => {
  setIsLoading(true);

  const uploadedImage = await useIPFSImageUpload(nftGeneralInfo.image);

  const metadata = JSON.stringify({
    name: nftGeneralInfo.name,
    description: nftGeneralInfo.description,
    price: nftGeneralInfo.price,
    image: uploadedImage,
  });

  const tokenURI = await useIPFSJSONUpload(metadata);
  try {
    const collection = await getCollectionById(
      collectionID,
      collectionContract
    );

    if (!collection) return;

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
    const tokenMintedEvent = receipt.events?.find(
      (e: any) => e.event === 'TokenMinted'
    );

    if (tokenMintedEvent) {
      const newTokenID = Number(tokenMintedEvent.args?.tokenId);
      console.log('collection contract', collectionContract);
      console.log('newTokenID', newTokenID);

      //STORE LOG IN DB
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

      //CLEAR NFT GENERAL INFORMATION
      editGeneralInformation({
        image: null,
        name: '',
        description: '',
        price: 0,
        collection: '',
      });
    } else {
      console.error('Token Minted event not found in receipt');
    }
  } catch (error) {
    console.log({ error });
    const message = getErrMessage(error);
    toast.error(message);
  } finally {
    setIsLoading(false);
  }
};

const getCollectionById = async (
  id: number,
  collectionContract: ethers.Contract
) => {
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
const getErrMessage = (err: any) => err?.reason || 'Error...';
export default useMintNFT;
