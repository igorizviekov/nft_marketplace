import styles from './file-preview.module.scss';
import { IFilePreviewProps } from './file-preview.types';
import { Button } from '../../ui/Button';
import Icon from '../../ui/Icon/Icon';
import { TiDelete } from 'react-icons/ti';

export const FilePreview = ({
  file,
  onDelete,
  onReplace,
}: IFilePreviewProps) => {
  const thumb = URL.createObjectURL(file);

  return (
    <div className={[styles['file-preview']].join(' ')}>
      <Icon
        icon={<TiDelete style={{ width: '40px', height: '40px' }} />}
        className={styles.icon}
        onClick={onDelete}
      />
      <img
        src={thumb}
        alt={file.name}
        // Revoke data uri after image is loaded
        onLoad={() => URL.revokeObjectURL(thumb)}
        className={styles['file-preview__thumb']}
      />
      <div className={styles['file-preview__controls']}>
        <Button label="Replace" onClick={onReplace} isPrimary={false} />
      </div>
    </div>
  );
};
