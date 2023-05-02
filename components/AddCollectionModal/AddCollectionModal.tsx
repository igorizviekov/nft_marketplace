import React, { useState } from 'react';
import styles from './AddCollectionModal.module.scss';
import { IAddCollectionModalProps } from './AddCollectionModal.types';
import { Modal } from '../modal';
import ProfileImageUpload from '../ProfileImageUpload/ProfileImageUpload';
import Input from '../ui/Input';
import { Button } from '../ui/Button';
import { toast } from 'react-toastify';
const AddCollectionModal = ({ handleModalClose }: IAddCollectionModalProps) => {
  const [file, setFile] = useState<File | null>(null);

  return (
    <Modal onClose={handleModalClose}>
      <div className={styles.container}>
        <ProfileImageUpload
          file={file}
          onUploadAbort={() => setFile(null)}
          title={'Upload'}
          subTitle={'Collection banner'}
        />
        <Input
          title={'Name'}
          inputType={'text'}
          placeholder={'Enter collections name'}
        />
        <Input
          title={'Symbol'}
          inputType={'text'}
          placeholder={'Enter collections name'}
        />
        <Input
          title={'Category'}
          inputType={'text'}
          placeholder={'Enter collections name'}
        />
        <Input
          title={'Chain'}
          inputType={'text'}
          placeholder={'Enter collections name'}
        />
        <Input
          title={'Royalties'}
          inputType={'text'}
          placeholder={
            'This will let you add multiple wallets with different royalties'
          }
        />
        <Input
          title={'Website'}
          inputType={'text'}
          placeholder={'Enter collections name'}
        />
        <Input
          title={'Description'}
          inputType={'textarea'}
          placeholder={'Enter collections name'}
        />
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
