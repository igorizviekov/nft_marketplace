import React, { useEffect, useState } from 'react';
import BasePage from '../../components/ui/Base/BasePage/BasePage';
import { Button } from '../../components/ui/Button';
import { FileUpload } from '../../components/file-upload';
import { Modal } from '../../components/modal';
import { CreateError } from '../../components/modal/create-error';
import { toast } from 'react-toastify';
import { isFormValid, submitNewNFT } from '../../scripts/utils';
import { useStoreState } from '../../store';
import { Dropdown } from '../../components/ui/dropdown';
import SingleForm from './SingleForm';
import CollectionForm from './CollectionForm';

export type TypeOfMint = 'Single' | 'Collection';

const CreateSingleForm = () => {
  const options: TypeOfMint[] = ['Single', 'Collection'];
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const [selected, setSelected] = useState<number>(0);

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
  return (
    <BasePage>
      {modal}
      <div className="w-full animate-fadeIn">
        <h1>Create NFT</h1>
        <Dropdown
          options={options}
          checked={selected}
          heading={'Type of mint'}
          onChange={setSelected}
        />
        <div className="mt-24">
          <div className="mt-4"></div>
        </div>
        {options[selected] === 'Single' ? <SingleForm /> : <CollectionForm />}
      </div>
    </BasePage>
  );
};

export default CreateSingleForm;
