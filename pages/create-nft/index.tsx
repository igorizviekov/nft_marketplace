import { NextPage } from 'next';
import React, { useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { Button } from '../../components/ui/Button';
import { FileUpload } from '../../components/file-upload';
import { FaFileImage } from 'react-icons/fa';
import Input from '../../components/ui/Input';

// import { Button, Input, Loader } from '../components';
// import images from '../assets';
// import { useCurrentNFTContext } from '../context/NFTContext';

export interface IFormInput {
  price: string;
  name: string;
  description: string;
}

const CreateNFT: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  // const { uploadToIPFS, createNFT, isLoadingNFT } = useCurrentNFTContext();
  const { theme } = useTheme();
  const [file, setFile] = useState<File | null>(null);

  const [formInput, setFormInput] = useState<IFormInput>({
    price: '',
    name: '',
    description: '',
  });
  const router = useRouter();

  if (isLoading) {
    return <div className="flex-start min-h-screen">Loading..</div>;
  }

  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-3/5 md:w-full">
        <h1 className="flex-1 font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold sm:mb-4">
          Create new NFT
        </h1>
        <div className="mt-16">
          <div className="mt-4">
            <FileUpload
              heading="Create new NFT"
              subTitle="JPG, PNG, GIF, SVG, WEBM, Max 100mb."
              title="Upload new file"
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
            onClick={() => console.log('create nft')}
            //onClick={() => createNFT(formInput, fileUrl, router)}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateNFT;
