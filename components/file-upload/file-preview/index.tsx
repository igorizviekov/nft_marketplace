// import { BodyTwo } from '../../../new-typography/common';
import styles from './file-preview.module.scss';
// import { grey } from '../../../../common';
// import { Button } from '../../../new-button';
import { IFilePreviewProps } from './file-preview.types';
import { useEffect } from 'react';
import { Button } from '../../ui/Button';

export const FilePreview = ({
  file,
  onDelete,
  onReplace,
}: IFilePreviewProps) => {
  const thumb = URL.createObjectURL(file);

  // useEffect(() => {
  //   // Make sure to revoke the data uris to avoid memory leaks
  //   return () => URL.revokeObjectURL(thumb);
  // }, [thumb]);

  return (
    <div className={styles['file-preview']}>
      <img
        src={thumb}
        alt={file.name}
        // Revoke data uri after image is loaded
        onLoad={() => URL.revokeObjectURL(thumb)}
        className={styles['file-preview__thumb']}
      />
      <div className={styles['file-preview__controls']}>
        <div className={styles['file-preview__controls__file-name']}>
          <h1>{file.name}</h1>
        </div>
        <Button label="Replace Image" onClick={onReplace} isPrimary />
        <Button label="Delete Image" onClick={onDelete} isPrimary={false} />
      </div>
    </div>
  );
};
