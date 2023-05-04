import React, { useState } from 'react';
import styles from './AddCollectionModal.module.scss';
import { IAddCollectionModalProps } from './AddCollectionModal.types';
import { Modal } from '../modal';
import ProfileImageUpload from '../ProfileImageUpload/ProfileImageUpload';
import Input from '../ui/Input';
import { Button } from '../ui/Button';
import { toast } from 'react-toastify';
import { Dropdown } from '../ui/dropdown';
const AddCollectionModal = ({ handleModalClose }: IAddCollectionModalProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [chain, setChain] = useState<number>(0);
  const [mainCategory, setMainCategory] = useState<number>(0);
  const [subcategory, setSubCategory] = useState<number>(0);
  return (
    <Modal onClose={handleModalClose}>
      <div className={styles.column}>
        <div className={styles.container}>
          <div className={styles.column}>
            <ProfileImageUpload
              file={file}
              onUploadAbort={() => setFile(null)}
              title={'Upload'}
              subTitle={'Collection banner'}
            />
            <Input
              title={'Royalties (Optional)'}
              inputType={'text'}
              placeholder={
                'This will let you add multiple wallets with different royalties'
              }
              id={'royalties'}
            />
            <Input
              title={'Website (Optional)'}
              inputType={'text'}
              placeholder={'Enter collections name'}
              id={'website'}
            />
            <Input
              title={'Description (Optional)'}
              inputType={'textarea'}
              placeholder={'Enter collections name'}
              id={'description'}
            />
          </div>
          <div className={styles.column}>
            <Input
              title={'Name'}
              inputType={'text'}
              placeholder={'Enter collections name'}
              id={'name'}
            />
            <Input
              title={'Symbol'}
              inputType={'text'}
              placeholder={'Enter collections name'}
              id={'symbol'}
            />
            <Dropdown
              heading={'Chain'}
              placeholder={'Enter collections name'}
              options={['BNB', 'SMR', 'BTC']}
              checked={chain}
              onChange={setChain}
              openModal={function (): void {
                throw new Error('Function not implemented.');
              }}
            />
            <Dropdown
              heading={'Main Category'}
              placeholder={'Enter collections name'}
              options={['Cat 1', 'Cat 2', 'Cat 3']}
              checked={mainCategory}
              onChange={setMainCategory}
              openModal={function (): void {
                throw new Error('Function not implemented.');
              }}
            />
            <Dropdown
              heading={'Subcategory'}
              placeholder={'Enter collections name'}
              options={['Cat 1', 'Cat 2', 'Cat 3']}
              checked={subcategory}
              onChange={setSubCategory}
              openModal={function (): void {
                throw new Error('Function not implemented.');
              }}
            />
          </div>
        </div>
        <p>Contract address will go here as info for the user?</p>

        <Button
          isPrimary={false}
          label={'Save collection'}
          onClick={() => toast.warn('@TODO Connect inputs')}
        />
      </div>
    </Modal>
  );
};

export default AddCollectionModal;
