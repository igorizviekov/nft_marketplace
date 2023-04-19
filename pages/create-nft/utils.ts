import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import { fetchContract } from '../../utils';
import { useRouter } from 'next/router';
import { create as ipfsClient } from 'ipfs-http-client';
import { IFormInput } from '.';
import { useStoreState } from '../../store';

export const isFormValid = (
  name: string,
  price: number,
  description: string,
  file?: File
) => {
  if (!file) return false;
  if (!name.length) return false;
  if (Number.isNaN(price)) return false;
  if (price <= 0) return false;
  if (!description.length) return false;
  return true;
};

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
  file: File,
  name: string,
  price: number,
  description: string,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setIsModalVisible: React.Dispatch<React.SetStateAction<string | boolean>>,
  userName?: string,
  userAvatar?: string
) => {
  try {
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
    const addedImage = await client.add({ content: file });

    /**
     * Upload NFT data to Infura
     */
    const data = JSON.stringify({
      name,
      price,
      description,
      // url of Infura project plus id of uploaded image
      image: `https://${process.env.NEXT_PUBLIC_INFURA_PROJECT_NAME}.infura-ipfs.io/ipfs/${addedImage.path}`,
      nickname: userName,
      avatar: userAvatar,
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
    setIsModalVisible(true);
  }
};

export const submitNewNFT = async (
  formInput: IFormInput,
  setIsError: React.Dispatch<React.SetStateAction<string | boolean>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  file: File | null
) => {
  const { name, price, description } = formInput;
  const userState = useStoreState((state) => state.user);

  if (!isFormValid(name, Number(price), description)) {
    setIsError('Please provide all necessary data to continue');
  }
  try {
    setIsLoading(true);
    await covertImageToNFT(
      file as File,
      name,
      Number(price),
      description,
      setIsLoading,
      setIsError,
      userState.name,
      userState.avatar
    );
  } catch {
    setIsError('Error occurred when submitting a new NFT. Please try again');
    setIsLoading(false);
  }
};
