import { NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button } from '../../components/ui/Button';
import { FileUpload } from '../../components/file-upload';
import Input from '../../components/ui/Input';
import { create as ipfsClient } from 'ipfs-http-client';
import { toast } from 'react-toastify';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import { Spinner } from '../../components/spinner';
import { fetchContract } from '../../utils';
import Link from 'next/link';
import { useStoreRehydrated, useStoreState } from 'easy-peasy';
import { IStoreModel } from '../../store/model/model.types';
import { UserLogin } from '../../components/user-login';
import { Modal } from '../../components/modal';
import { CreateError } from '../../components/modal/create-error';

export interface IFormInput {
  price: string;
  name: string;
  description: string;
}

const CreateNFT: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<boolean | string>(false);
  const [file, setFile] = useState<File | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean | string>(false);
  const isRehydrated = useStoreRehydrated();

  const [formInput, setFormInput] = useState<IFormInput>({
    price: '',
    name: '',
    description: '',
  });

  const router = useRouter();

  const userState = useStoreState((state: IStoreModel) => state.user);

  const isFormValid = (name: string, price: number, description: string) => {
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
  const createSale = async (uploadedFileUrl: string, nftPrice: number) => {
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

  const covertImageToNFT = async (
    file: File,
    name: string,
    price: number,
    description: string,
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

  const submitNewNFT = async () => {
    const { name, price, description } = formInput;
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
        userState.name,
        userState.avatar
      );
    } catch {
      setIsError('Error occurred when submitting a new NFT. Please try again');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error(isError);
    }
  }, [isError]);

  const modal = isModalVisible && (
    <Modal
      header="Failed to create NFT"
      footer={
        <Button
          isPrimary={false}
          label="Dismiss"
          onClick={() => setIsModalVisible(false)}
        />
      }
      body={<CreateError />}
      onClose={() => setIsModalVisible(false)}
    />
  );

  return isLoading || !isRehydrated ? (
    <Spinner styles="min-h-screen flexCenter animate-fadeIn" />
  ) : (
    <div className="flex justify-center sm:px-4 p-12">
      {modal}
      <div className="w-3/5 md:w-full animate-fadeIn">
        <div className="mt-24">
          <div className="mt-4">
            <FileUpload
              heading="Create new NFT"
              subTitle="JPG, PNG, GIF, SVG, WEBP, Max 600KB."
              title="Drag or click to upload a file"
              onDropAccepted={(arr) => {
                setFile(arr?.[0]);
              }}
              onUploadAbort={() => setFile(null)}
              file={file}
            />
          </div>
        </div>

        <Input
          inputType="input"
          title="Name"
          placeholder="NFT Name"
          handleClick={(e) =>
            setFormInput({
              ...formInput,
              name: (e.target as HTMLInputElement).value,
            })
          }
        />

        <Input
          inputType="textarea"
          title="Description"
          placeholder="NFT Description"
          handleClick={(e) =>
            setFormInput({
              ...formInput,
              description: (e.target as HTMLTextAreaElement).value,
            })
          }
        />

        <Input
          inputType="number"
          title="Price"
          placeholder="NFT Price"
          handleClick={(e) =>
            setFormInput({
              ...formInput,
              price: (e.target as HTMLInputElement).value,
            })
          }
        />
        <p className="font-poppins dark:text-white text-nft-black-1 mt-4 ml-4 sm:ml-2 text-base ">
          When selling your NFT, 15% of it's price will be donated to the
          following charity funds to support Ukraine:
        </p>
        <p className="font-poppins dark:text-white text-nft-black-1 mt-2 ml-10 font-semibold ">
          <Link href="https://helpingtoleave.org/" target="_blank">
            - Helping to leave
          </Link>
        </p>
        <p className="font-poppins dark:text-white text-nft-black-1 mt-2 ml-10 font-semibold ">
          <Link
            href="https://savelife.in.ua/en/about-foundation-en/"
            target="_blank"
          >
            - Come Back Alive
          </Link>
        </p>
        <p className="font-poppins dark:text-white text-nft-black-1 mt-2 ml-10 font-semibold ">
          <Link href="https://prytulafoundation.org/en" target="_blank">
            - Charity foundation of Serhiy Prytula
          </Link>
        </p>
        <p className="font-poppins dark:text-white text-nft-black-1 mt-6 ml-4 font-semibold sm:ml-2">
          Also a fee of 0.001 Eth will be charged for listing your NFT on our
          platform.
        </p>
        <p className="font-poppins dark:text-white text-nft-black-1 mt-2 ml-4 font-semib old sm:ml-2">
          We appreciate your understanding and look forward to seeing your NFT
          on our marketplace.
        </p>
        {!userState.avatar?.length && (
          <div className="flex sm:flex-col items-center mt-8">
            <UserLogin />
            <p className="font-poppins dark:text-white text-nft-black-1 ml-4 text-base sm:text-center">
              * if you want to be featured on our "Top creators" list.
            </p>
          </div>
        )}
        <div className="mt-7 w-full flex justify-end">
          <Button
            isPrimary
            label="Create NFT"
            classStyles="rounded-xl"
            disabled={
              !isFormValid(
                formInput.name,
                Number(formInput.price),
                formInput.description
              )
            }
            onClick={submitNewNFT}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateNFT;
