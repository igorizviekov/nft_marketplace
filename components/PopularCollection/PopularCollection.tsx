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
      <h3 className={styles.index}>{index + 1}</h3>
      <div className={styles.image}>
        <BaseImage imageUrl={image} />
      </div>

      <div className={styles.info}>
        <div className={styles.top}>
          <h2>{name}</h2>
          <p className={styles.growth}>0%</p>
        </div>
        <div className={styles.bottom}>
          <h3>{floorPrice} Floor</h3>
          <h3>Vol. {parseVolume(volume)}</h3>
        </div>
      </div>
    </div>
  );
};

export default PopularCollection;
