import React, { createRef, useState } from 'react';
import styles from './ProfileImageUpload.module.scss';
import { IProfileImageUploadProps } from './ProfileImageUpload.types';
import Dropzone from 'react-dropzone';
import { BsPlus } from 'react-icons/bs';
import { FilePreview } from '../file-upload/file-preview';
import classNames from 'classnames';
const ProfileImageUpload = ({
  file,
  title,
  subTitle,
  heading,
  disabled,
  onUploadAbort,
  onDropAccepted,
  description,
  ...props
}: IProfileImageUploadProps) => {
  let dropzoneRef: any = createRef();
  const [error, setError] = useState('');

  const [fileOver, setFileOver] = useState(false);

  const dropzone = (
    <Dropzone
      ref={(node) => (dropzoneRef = node)}
      accept={{
        'image/*': ['.png', '.jpeg', '.jpg', '.webp'],
      }}
      onDropRejected={(res) => {
        setError('Upload failed');
      }}
      onDropAccepted={(file, e) => {
        setError('');
        onDropAccepted?.(file, e);
      }}
      onDragOver={() => setFileOver(true)}
      onDragLeave={() => setFileOver(false)}
      disabled={disabled}
      maxSize={600000}
      {...props}
    >
      {({ getRootProps, getInputProps }) => (
        <div
          className={classNames(file ? 'hidden' : styles.container)}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <p className={styles.title}>{title}</p>
          <BsPlus color="green" size={50} />
          <p className={styles.subtitle}>{subTitle}</p>
          {error && (
            <p>
              Please ensure the file type is correct and it is not larger than
              600KB.
            </p>
          )}
        </div>
      )}
    </Dropzone>
  );

  const filePreview = file && (
    <FilePreview
      file={file}
      onDelete={() => {
        setFileOver(false);
        onUploadAbort?.();
      }}
      onReplace={() => {
        dropzoneRef?.open();
      }}
    />
  );
  return (
    <>
      {filePreview}
      {dropzone}
    </>
  );
};

export default ProfileImageUpload;
