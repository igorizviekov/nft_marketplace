import React from 'react';
import { IPopularCollectionProps } from './PopularCollection.types';
import styles from './PopularCollection.module.scss';
import BaseImage from '../ui/Base/BaseImage/BaseImage';
import { parseVolume } from './utils';
const PopularCollection = ({
  image,
  name,
  floorPrice,
  volume,
  index,
}: IPopularCollectionProps) => {
  return (
    <div className={styles.container}>
      {index + 1}
      <div className={styles.image}>
        <BaseImage imageUrl={image} />
      </div>

      <div className={styles.info}>
        <div className={styles.top}>
          <h1>{name}</h1>
          <p>0%</p>
        </div>
        <div className={styles.bottom}>
          <p>{floorPrice} Floor</p>
          <p>{parseVolume(volume)}</p>
        </div>
      </div>
    </div>
  );
};

export default PopularCollection;
