import styles from './file-upload.module.scss';
import { useState, createRef } from 'react';
import Dropzone from 'react-dropzone';
import { FilePreview } from './file-preview';
import { BsFillCloudUploadFill } from 'react-icons/bs';
import { IFileUploadProps } from './file-upload.types';

export const FileUpload = ({
  file,
  title,
  subTitle,
  heading,
  disabled,
  onUploadAbort,
  onDropAccepted,
  description,
  ...props
}: IFileUploadProps) => {
  let dropzoneRef: any = createRef();
  const [error, setError] = useState('');
  const errorMessage = error && 'error';
  const [fileOver, setFileOver] = useState(false);
  const classNames = [
    styles['file-upload'],
    description && styles['file-upload__with-description'],
    disabled && styles['file-upload--disabled'],
    fileOver && styles['file-upload--file-over'],
    'dark:bg-nft-black-1',
  ]
    .filter(Boolean)
    .join(' ');

  const headingElement = heading && !file && (
    <p className="flex-1 font-poppins dark:text-nft-red-violet text-nft-black-1 font-semibold text-3xl mb-1">
      {heading}
    </p>
  );

  const dropzone = (
    <Dropzone
      ref={(node) => (dropzoneRef = node)}
      accept={{
        'image/*': ['.png', '.jpeg', '.jpg', '.webp'],
      }}
      onDropRejected={(res) => {
        setError(res?.[0]?.errors?.[0]?.message || 'Upload failed');
      }}
      onDropAccepted={(file, e) => {
        setError('');
        onDropAccepted?.(file, e);
      }}
      onDragOver={() => setFileOver(true)}
      onDragLeave={() => setFileOver(false)}
      disabled={disabled}
      maxSize={10000000}
      {...props}
    >
      {({ getRootProps, getInputProps }) => (
        <div className={file ? 'hidden' : ''}>
          {headingElement}
          <div
            data-description={description}
            {...getRootProps({ className: classNames })}
          >
            <input {...getInputProps()} />
            <BsFillCloudUploadFill color="#eb4d4b" size={150} />
            <div className={styles['file-upload__info']}>
              <p className="font-poppins  text-nft-black-1 dark:text-white font-semibold text-xl mb-1">
                {title}
              </p>

              <p className="font-poppins  text-nft-black-1 dark:text-white">
                {subTitle}
              </p>
            </div>
          </div>
          {errorMessage}
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
