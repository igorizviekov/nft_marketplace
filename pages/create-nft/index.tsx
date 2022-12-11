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

  const isFormValid = () => {
    if (!file) return false;
    if (!formInput.name.length) return false;
    if (!formInput.price.length) return false;
    if (!formInput.description.length) return false;
    return true;
  };

  const uploadFileToIPFS = async (file: File) => {
    try {
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
      const added = await client.add({ content: file });

      const fileUrl = `https://crypto-basset.infura-ipfs.io/ipfs/${added.path}`;
      return fileUrl;
    } catch (err) {
      console.log('Failed to upload image to ipfs', err);
      throw new Error('Failed to upload image to ipfs');
    }
  };

  const submitNewNFT = async () => {
    if (!isFormValid() || !file) {
      return alert('Please provide all nessesery data to continue');
    }
    try {
      setIsLoading(true);
      const fileUrl = await uploadFileToIPFS(file as File);
      setIsError(false);
      setIsLoading(false);
      console.log('upload success', fileUrl);
    } catch {
      setIsError(true);
      setIsLoading(false);
      alert('Error occurred when submitting a new NFT. Please try again');
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
            disabled={!isFormValid()}
            onClick={submitNewNFT}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateNFT;
