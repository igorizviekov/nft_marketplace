import React, { useEffect, useState } from 'react';
import BasePage from '../../components/ui/Base/BasePage/BasePage';
import { Button } from '../../components/ui/Button';
import Link from 'next/link';
import Input from '../../components/ui/Input';
import { FileUpload } from '../../components/file-upload';
import { Modal } from '../../components/modal';
import { CreateError } from '../../components/modal/create-error';
import { useStoreRehydrated } from 'easy-peasy';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { isFormValid, submitNewNFT } from './utils';
import { useStoreState } from '../../store';

export interface IFormInput {
  price: string;
  name: string;
  description: string;
}

const CreateSingleForm = () => {
  const router = useRouter();
  const isRehydrated = useStoreRehydrated();
  const [file, setFile] = useState<File | null>(null);
  const [isError, setIsError] = useState<boolean | string>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [formInput, setFormInput] = useState<IFormInput>({
    price: '',
    name: '',
    description: '',
  });
  const userState = useStoreState((state) => state.user);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  useEffect(() => {
    if (isError) {
      toast.error(isError);
    }
  }, [isError]);

  return (
    <BasePage>
      {modal}
      <div className="w-full animate-fadeIn">
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
          inputType="text"
          title="Name"
          placeholder="NFT Name"
          handleChange={(e) =>
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
          handleChange={(e) =>
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
          handleChange={(e) =>
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
            onClick={() =>
              submitNewNFT(formInput, setIsError, setIsLoading, file)
            }
          />
        </div>
      </div>
    </BasePage>
  );
};

export default CreateSingleForm;
