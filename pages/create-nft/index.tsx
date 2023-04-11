import { NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button } from '../../components/ui/Button';
import { FileUpload } from '../../components/file-upload';
import Input from '../../components/ui/Input';
import { toast } from 'react-toastify';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import { Spinner } from '../../components/spinner';
import { fetchContract } from '../../utils';
import Link from 'next/link';
import { useStoreRehydrated, useStoreState } from 'easy-peasy';
import { IStoreModel } from '../../store/model/model.types';
import { Modal } from '../../components/modal';
import { CreateError } from '../../components/modal/create-error';
import axios from 'axios';

export interface IFormInput {
  price: string;
  name: string;
  description: string;
  [key: string]: any;
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
  const walletState = useStoreState((state: IStoreModel) => state.wallet);
  const isFormValid = (name: string, price: number, description: string) => {
    if (!file) return false;
    if (!name.length) return false;
    if (Number.isNaN(price)) return false;
    if (price <= 0) return false;
    if (!description.length) return false;
    return true;
  };

  const submitNewNFT = async () => {
    const { name, price, description } = formInput;
    if (!isFormValid(name, Number(price), description)) {
      setIsError('Please provide all necessary data to continue');
    }

    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('file', file as File);
      formData.append('price', formInput.price as string);
      formData.append('metadata', JSON.stringify(formInput) as string);

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACK_API}/nft/mint?chain=${walletState.currency}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${userState.token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      const { data } = res.data;
      const { contractAddress, MarketAddressABI, nftURL } = data;
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
      const contract = fetchContract(signer, contractAddress, MarketAddressABI);
      console.log({ contract });
      /**
       * Convert price value from the form input to the blockchain readable format
       */
      const bPrice = ethers.utils.parseUnits(price.toString(), 'ether');
      const listingPrice = await contract.getListingPrice();

      const transaction = await contract.createToken(bPrice, nftURL, {
        value: listingPrice,
      });

      // should trigger metamask popup
      await transaction.wait();
      toast.success('NFT successfully created');
      setTimeout(() => router.push('/'), 2000);
    } catch (e) {
      console.log(e);
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

        <div className="mt-7 w-full flex justify-end">
          <Button
            isPrimary
            label={userState.token ? 'Create NFT' : 'Sign In to create NFT'}
            classStyles="rounded-xl"
            disabled={
              !isFormValid(
                formInput.name,
                Number(formInput.price),
                formInput.description
              ) || !userState.token.length
            }
            onClick={submitNewNFT}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateNFT;
