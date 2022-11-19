import styles from './file-upload.module.scss';
import { useState, createRef } from 'react';
import Dropzone from 'react-dropzone';
import { FilePreview } from './file-preview';
import { CgImage } from 'react-icons/cg';
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
  ]
    .filter(Boolean)
    .join(' ');

  const headingElement = heading && !file && (
    <h1 className={styles['file-upload__heading']}>{heading}</h1>
    // <HeaderFive
    //   label={heading}
    //   color={error ? redText : blueText}
    //   className={styles['file-upload__heading']}
    // />
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
            // style={{
            //   display: file?.name ? 'none' : '',
            //   border: error ? `1px solid red` : '',
            // }}
            data-description={description}
            {...getRootProps({ className: classNames })}
          >
            <input {...getInputProps()} />
            <CgImage color="red" size="45px" />
            <div className={styles['file-upload__info']}>
              <h1>{title}</h1>
              <h1>{subTitle}</h1>

              {/* <BodyTwo label={title} color={grey} />
              <BodyOne label={subTitle} color={cadetGrey} /> */}
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
