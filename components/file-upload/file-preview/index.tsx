import styles from './file-preview.module.scss';
import { IFilePreviewProps } from './file-preview.types';
import { Button } from '../../ui/Button';

export const FilePreview = ({
  file,
  onDelete,
  onReplace,
}: IFilePreviewProps) => {
  const thumb = URL.createObjectURL(file);

  return (
    <div className={[styles['file-preview'], 'dark:bg-nft-black-3'].join(' ')}>
      <img
        src={thumb}
        alt={file.name}
        // Revoke data uri after image is loaded
        onLoad={() => URL.revokeObjectURL(thumb)}
        className={styles['file-preview__thumb']}
      />
      <div className={styles['file-preview__controls']}>
        <div className={styles['file-preview__controls__file-name']}>
          <p className="font-poppins  text-nft-black-1 font-semibold text-lg mb-1">
            {file.name}
          </p>
        </div>
        <Button label="Replace" onClick={onReplace} isPrimary />
        <Button label="Delete" onClick={onDelete} isPrimary={false} />
      </div>
    </div>
  );
};
