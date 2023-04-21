import React, { useState } from 'react';
import { FileUpload } from '../../components/file-upload';
import Input from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { isFormValid, submitNewNFT } from '../../scripts/utils';
import { Dropdown } from '../../components/ui/dropdown';

export interface ICollectionFormProps {
  price: string;
  name: string;
  description: string;
  symbol: string;
  category: 'Category 1' | 'Category 2' | 'Category 3';
  chain: '';
  royalties?: number;
  website?: string;
}

export interface ISingleFormProps {
  collectionInput: ICollectionFormProps;
  setFormInput: React.Dispatch<React.SetStateAction<ICollectionFormProps>>;
}
const CollectionForm = () => {
  const [file, setFile] = useState<File | null>(null);

  const [formInput, setFormInput] = useState<ICollectionFormProps>({
    price: '',
    name: '',
    description: '',
    symbol: '',
    category: 'Category 1',
    chain: '',
    royalties: 0,
    website: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean | string>(false);

  const [selected, setSelected] = useState<number>(0);
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
        title="Collection Name"
        placeholder="Collection Name"
        handleChange={(e) =>
          setFormInput({
            ...formInput,
            name: (e.target as HTMLInputElement).value,
          })
        }
      />

      <Input
        inputType="text"
        title="Collection Symbol"
        placeholder="Collection Symbol"
        handleChange={(e) =>
          setFormInput({
            ...formInput,
            name: (e.target as HTMLInputElement).value,
          })
        }
      />

      <Dropdown
        heading={'Category'}
        options={['Category 1', 'Category 2', 'Category 3']}
        checked={selected}
        onChange={setSelected}
      />

      <Dropdown
        heading="Chain"
        options={['Shimmer', 'Polygon', 'Binance']}
        checked={selected}
        onChange={setSelected}
      />

      <Input
        inputType="textarea"
        title="Collection Description"
        placeholder="Collection Description"
        handleChange={(e) =>
          setFormInput({
            ...formInput,
            description: (e.target as HTMLTextAreaElement).value,
          })
        }
      />

      <Input
        inputType="number"
        title="Royalties"
        placeholder="%"
        handleChange={(e) =>
          setFormInput({
            ...formInput,
            price: (e.target as HTMLInputElement).value,
          })
        }
      />

      <Input
        inputType="text"
        title="Website"
        placeholder="https://mywebsite.io"
        handleChange={(e) =>
          setFormInput({
            ...formInput,
            price: (e.target as HTMLInputElement).value,
          })
        }
      />

      <Input
        inputType="number"
        title="Individual NFT Price"
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
    </>
  );
};

export default CollectionForm;
