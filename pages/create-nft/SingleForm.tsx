import React, { ChangeEvent, useState } from 'react';
import Input from '../../components/ui/Input';
import { FileUpload } from '../../components/file-upload';
import { Button } from '../../components/ui/Button';
import { isFormValid, submitNewNFT } from '../../scripts/utils';
import { Dropdown } from '../../components/ui/dropdown';
import AddCollectionModal from '../../components/AddCollectionModal/AddCollectionModal';
import styles from '../../styles/pages/CreateNFTPage.module.scss';
import classNames from 'classnames';
import {
  validateDescription,
  validateName,
  validatePrice,
} from '../../components/ui/Input/utils';
export interface IFormInput {
  name: string;
  description: string;
  price: string;
  image?: string;
  collection?: string;
}

export const ADD_COLLECTION = '+ Add Collection';
const SingleForm = () => {
  const [formInput, setFormInput] = useState<IFormInput>({
    price: '0',
    name: '',
    description: '',
    image: '',
    collection: '',
  });

  const OPTIONS = ['Collection 1', 'Collection 2', 'Collection 3'];
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean | string>(false);

  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const changeHandler = (e: React.ChangeEvent<Element>) => {
    setFormInput({
      ...formInput,
      [e.target.id]: (e.target as HTMLInputElement).value,
    });

    if ((e.target as HTMLInputElement).value === ADD_COLLECTION) {
      setModalOpen(true);
    }
  };

  return (
    <div className={classNames('flex-col-center', styles.form)}>
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
        id="name"
        inputType="text"
        title="Name"
        placeholder="NFT Name"
        handleChange={changeHandler}
        error={validateName(formInput.name)}
      />

      <Input
        inputType="textarea"
        title="Description"
        placeholder="NFT Description"
        handleChange={changeHandler}
        id={'description'}
        error={validateDescription(formInput.description)}
      />
      <Dropdown
        heading="Select a collection"
        id="collection"
        options={[...OPTIONS, ADD_COLLECTION]}
        value={formInput.collection}
        placeholder="Or create a new one"
        onChange={changeHandler}
        openModal={() => setModalOpen(true)}
      />

      {isModalOpen && (
        <AddCollectionModal handleModalClose={() => setModalOpen(false)} />
      )}
      <Input
        inputType="number"
        title="Price"
        placeholder="NFT Price"
        value={formInput.price}
        handleChange={changeHandler}
        id={'price'}
        error={validatePrice(Number(formInput.price))}
      />

      <div className="mt-7 w-full flex justify-end">
        <Button
          isPrimary
          label="Create NFT"
          disabled={
            !isFormValid(
              formInput.name,
              Number(formInput.price),
              formInput.description,
              file
            )
          }
          onClick={() =>
            submitNewNFT(formInput, setIsError, setIsLoading, file)
          }
        />
      </div>
    </div>
  );
};

export default SingleForm;
