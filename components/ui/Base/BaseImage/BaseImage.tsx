import Image from 'next/image';
import React from 'react';
import styles from './BaseImage.module.scss';
import { IBaseImageProps } from './BaseImage.types';
import classNames from 'classnames';
export const TEST_IMAGE_URL =
  'https://cryptoslate.com/wp-content/themes/cryptoslate-2020/imgresize/timthumb.php?src=https://cryptoslate.com/wp-content/uploads/2022/01/ethereum-consensus-layer2.jpg&w=600&h=315&q=75';
const BaseImage = ({
  imageUrl,
  description,
  className,
  isHero,
}: IBaseImageProps) => {
  return (
    <div className={classNames(styles.container, isHero && styles.hero)}>
      <Image
        src={imageUrl ? imageUrl : TEST_IMAGE_URL}
        alt={'test image'}
        sizes="(max-width: 768px) 100vw,
        (max-width: 1200px) 50vw,
        33vw"
        fill
        priority={false}
        className={classNames(styles.image, className)}
      />
      {description && (
        <small className={styles.description}>{description}</small>
      )}
    </div>
  );
};

export default BaseImage;
