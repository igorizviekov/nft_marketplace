import React, { useState } from 'react';
import Input from '../../components/ui/Input';
import { FileUpload } from '../../components/file-upload';
import { Button } from '../../components/ui/Button';
import { isFormValid, submitNewNFT } from '../../scripts/utils';
import { toast } from 'react-toastify';
import { Dropdown } from '../../components/ui/dropdown';
import AddCollectionModal from '../../components/AddCollectionModal/AddCollectionModal';

export interface IFormInput {
  price: string;
  name: string;
  description: string;
}

export const ADD_COLLECTION = '+ Add Collection';
const SingleForm = () => {
  const [formInput, setFormInput] = useState<IFormInput>({
    price: '',
    name: '',
    description: '',
  });

  const OPTIONS = ['Collection 1', 'Collection 2', 'Collection 3'];
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean | string>(false);

  const [selected, setSelected] = useState<number>(0);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <>
      <FileUpload
        subTitle="JPG, PNG, GIF, SVG, WEBP, Max 600KB."
        title="Drag or click to upload a file"
        onDropAccepted={(arr) => {
          setFile(arr?.[0]);
        }}
        onUploadAbort={() => setFile(null)}
        file={file}
      />
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
      <Dropdown
        options={[...OPTIONS, ADD_COLLECTION]}
        checked={selected}
        placeholder="Or create a new one"
        onChange={setSelected}
        openModal={() => setModalOpen(true)}
      />

      {isModalOpen && (
        <AddCollectionModal handleModalClose={() => setModalOpen(false)} />
      )}
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

      <div className="mt-7 w-full flex justify-end">
        <Button
          isPrimary
          label="Create NFT"
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
    </>
  );
};

export default SingleForm;
