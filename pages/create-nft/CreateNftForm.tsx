import React, { useState } from 'react';
import BasePage from '../../components/ui/Base/BasePage/BasePage';
import { Dropdown } from '../../components/ui/dropdown';
import SingleForm from './SingleForm';
import CollectionForm from './BulkUploadForm';

export type TypeOfMint = 'Single Upload' | 'Bulk Upload';

const CreateSingleForm = () => {
  const options: TypeOfMint[] = ['Single Upload', 'Bulk Upload'];
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const [selected, setSelected] = useState<number>(0);

  return (
    <BasePage>
      <div className="w-full animate-fadeIn">
        <h1>Create NFT</h1>
        <Dropdown
          options={options}
          checked={selected}
          heading={'Type of mint'}
          onChange={setSelected}
          openModal={function (): void {
            throw new Error('Function not implemented.');
          }}
        />
        <div className="mt-24">
          <div className="mt-4"></div>
        </div>
        {options[selected] === 'Single Upload' ? (
          <SingleForm />
        ) : (
          <CollectionForm />
        )}
      </div>
    </BasePage>
  );
};

export default CreateSingleForm;
