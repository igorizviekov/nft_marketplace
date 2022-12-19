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
  const errorMessage = error && (
    <p className="font-poppins  text-nft-red-violet mt-3">
      Please ensure the file type is correct and it is not larger than 600KB.
    </p>
  );

  const [fileOver, setFileOver] = useState(false);
  const classNames = [
    styles['file-upload'],
    error && 'border-solid border-2 border-nft-red-violet',
    description && styles['file-upload__with-description'],
    disabled && styles['file-upload--disabled'],
    fileOver && styles['file-upload--file-over'],
    'dark:bg-nft-black-1',
  ]
    .filter(Boolean)
    .join(' ');

  const headingElement = heading && !file && (
    <p className="flex-1 font-poppins dark:text-white text-nft-black-1 font-semibold text-3xl mb-1">
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
        <div className={file ? 'hidden' : ''}>
          {headingElement}
          <div
            data-description={description}
            {...getRootProps({ className: classNames })}
          >
            <input {...getInputProps()} />
            <BsFillCloudUploadFill color="#FFDD00" size={150} />
            <div className={styles['file-upload__info']}>
              <p className="font-poppins  text-nft-black-1 dark:text-white font-semibold text-xl mb-1 max-w-sm overflow-hidden">
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
