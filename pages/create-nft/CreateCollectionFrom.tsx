import React, { useState } from 'react';
import BasePage from '../../components/ui/Base/BasePage/BasePage';
import { FileUpload } from '../../components/file-upload';
import Input from '../../components/ui/Input';
import Link from 'next/link';
import { Button } from '../../components/ui/Button';
import { isFormValid, submitNewNFT } from '../../scripts/utils';
import { IFormInput } from '.';
import { useStoreState } from '../../store';

const CreateCollectionFrom = () => {
  const [file, setFile] = useState<File | null>(null);
  const [formInput, setFormInput] = useState<IFormInput>({
    price: '',
    name: '',
    description: '',
  });
  const userState = useStoreState((state) => state.user);
  const [isError, setIsError] = useState<boolean | string>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <BasePage>
      <FileUpload
        file={file}
        onUploadAbort={() => setFile(null)}
        onDropAccepted={(arr) => {
          setFile(arr?.[0]);
        }}
        title={'Drag or Click to upload a file'}
        subTitle={'JPG, PNG, GIF, SVG, WEBP, Max 600KB.'}
        heading="Create new NFT collection"
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
        We appreciate your understanding and look forward to seeing your NFT on
        our marketplace.
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
    </BasePage>
  );
};

export default CreateCollectionFrom;
