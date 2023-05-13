import React, { useState } from 'react';
import { Dropdown } from '../../components/ui/dropdown';
import SingleForm from './SingleForm';
import CollectionForm from './BulkUploadForm';
import styles from '../../styles/pages/CreateNFTPage.module.scss';
import classNames from 'classnames';

export type TypeOfMint = 'Single Upload' | 'Bulk Upload';

const CreateSingleForm = () => {
  const options: TypeOfMint[] = ['Single Upload', 'Bulk Upload'];
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const [selected, setSelected] = useState<number>(0);

  return (
    <div className={classNames(styles.form, 'flex-col-center')}>
      <h1>Create NFT</h1>
      <Dropdown
        options={options}
        checked={selected}
        required
        heading={'Type of mint'}
        onChange={setSelected}
        openModal={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
      {options[selected] === 'Single Upload' ? (
        <SingleForm />
      ) : (
        <CollectionForm />
      )}
    </div>
  );
};

export default CreateSingleForm;
