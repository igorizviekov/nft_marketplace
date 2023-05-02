import React, { useState } from 'react';
import { FileUpload } from '../../components/file-upload';
import Input from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { isFormValid, submitNewNFT } from '../../scripts/utils';
import { Dropdown } from '../../components/ui/dropdown';
import BulkUpload from '../../components/BulkUpload/BulkUpload';
import BaseLink from '../../components/ui/Base/BaseLink/BaseLink';
import { ADD_COLLECTION } from './SingleForm';
import AddCollectionModal from '../../components/AddCollectionModal/AddCollectionModal';

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
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const OPTIONS = ['Collection 1', 'Collection 2', 'Collection 3'];

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
    <div className="flex-col-center">
      <BulkUpload
        file={file}
        onDropAccepted={(arr) => {
          setFile(arr?.[0]);
        }}
        onUploadAbort={() => setFile(null)}
        title={'Upload all images for the collection'}
        subTitle={'as a .zip or .rar'}
      />
      <BulkUpload
        file={file}
        onDropAccepted={(arr) => {
          setFile(arr?.[0]);
        }}
        onUploadAbort={() => setFile(null)}
        title={'Upload metadata'}
        subTitle={'as a .csv file'}
      />
      <BaseLink
        href={
          'https://docs.google.com/spreadsheets/d/1t4EPrrKsbTUEjfAJMUgnWkyBRNFLO6bSycB8RyXIQy8/edit#gid=1841889481'
        }
      >
        <p>You can dowload our template here!</p>
      </BaseLink>
      <Input
        title={'NFT Name'}
        inputType={'text'}
        placeholder={'Enter NFT name'}
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
      <div className="mt-7 w-full flex justify-end">
        <Button
          isPrimary
          label="Upload"
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
  );
};

export default CollectionForm;
