import React, { createRef, useState } from 'react';
import styles from './BulkUpload.module.scss';
import { IBulkUploadProps } from './BulkUpload.types';
import Dropzone from 'react-dropzone';
import classNames from 'classnames';
import { BsPlus } from 'react-icons/bs';
import { FilePreview } from '../file-upload/file-preview';
const BulkUpload = ({
  file,
  title,
  subTitle,
  heading,
  disabled,
  onUploadAbort,
  onDropAccepted,
  description,
  isCsv,
  ...props
}: IBulkUploadProps) => {
  let dropzoneRef: any = createRef();
  const [error, setError] = useState('');

  const [fileOver, setFileOver] = useState(false);

  const csv = { 'text/*': ['.csv'] };
  const rar = { 'application/*': ['.zip', '.x-rar-compressed'] };
  const dropzone = (
    <Dropzone
      ref={(node) => (dropzoneRef = node)}
      accept={isCsv ? csv : rar}
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
      maxSize={undefined}
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
      isBulkupload
    />
  );
  return (
    <>
      {filePreview}
      {dropzone}
    </>
  );
};

export default BulkUpload;
