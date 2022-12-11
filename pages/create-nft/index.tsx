import { NextPage } from 'next';
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import { Button } from '../../components/ui/Button';
import { FileUpload } from '../../components/file-upload';
import Input from '../../components/ui/Input';
import { Actions, useStoreActions } from 'easy-peasy';
import { IStoreModel } from '../../store/model/model.types';
import { create as ipfsClient } from 'ipfs-http-client';
import { toast } from 'react-toastify';

export interface IFormInput {
  price: string;
  name: string;
  description: string;
}

const CreateNFT: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const { theme } = useTheme();
  const [file, setFile] = useState<File | null>(null);

  const [formInput, setFormInput] = useState<IFormInput>({
    price: '',
    name: '',
    description: '',
  });
  const router = useRouter();

  // const uploadFileToIPFS = useStoreActions(
  //   (actions: Actions<IStoreModel>) => actions.wallet.uploadFileToIPFS
  // );

  const isFormValid = (name: string, price: number, description: string) => {
    if (!file) return false;
    if (!name.length) return false;
    if (Number.isNaN(price)) return false;
    if (price <= 0) return false;
    if (!description.length) return false;
    return true;
  };

  const uploadNFTToIPFS = async (
    file: File,
    name: string,
    price: number,
    description: string
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
        image: process.env.NEXT_PUBLIC_INFURA_GATEWAY + addedImage.path,
      });
      console.log('uploading an nft...', data);
      const addedNFT = await client.add(data);

      /**
       * Save NFT on Polygon
       */
      // todo
      //  await createSale(process.env.NEXT_PUBLIC_INFURA_GATEWAY + addedNFT.path);
    } catch (err) {
      console.log('Failed to upload NFT to ipfs', err);
      throw new Error('Failed to upload NFT to ipfs');
    }
  };

  const submitNewNFT = async () => {
    const { name, price, description } = formInput;
    if (!isFormValid(name, Number(price), description)) {
      return toast.error('Please provide all necessary data to continue');
    }
    try {
      setIsLoading(true);
      const fileUrl = await uploadNFTToIPFS(
        file as File,
        name,
        Number(price),
        description
      );

      setIsError(false);
      setIsLoading(false);
      console.log('upload success', fileUrl);
    } catch {
      setIsError(true);
      setIsLoading(false);
      toast.error('Error occurred when submitting a new NFT. Please try again');
    }
  };

  if (isLoading) {
    return <div className="flex-start min-h-screen">Loading..</div>;
  }

  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-3/5 md:w-full">
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
