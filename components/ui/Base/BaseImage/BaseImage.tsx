import Image from 'next/image';
import React from 'react';
import styles from './BaseImage.module.scss';
import { IBaseImageProps } from './BaseImage.types';
import classNames from 'classnames';
export const TEST_IMAGE_URL =
  'https://d7hftxdivxxvm.cloudfront.net/?height=800&quality=80&resize_to=fit&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FUh4mcnLwpIp3GqAkpfXRZA%2Fnormalized.jpg&width=800';
const BaseImage = ({ imageUrl, description, className }: IBaseImageProps) => {
  return (
    <div className={styles.container}>
      <Image
        src={imageUrl ? imageUrl : TEST_IMAGE_URL}
        alt={'test image'}
        fill
        className={classNames(styles.image, className)}
      />
      {description && (
        <small className={styles.description}>{description}</small>
      )}
    </div>
  );
};

export default BaseImage;
