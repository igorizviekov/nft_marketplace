import React from 'react';
import styles from './CollectionBanner.module.scss';
import { ICollectionBannerProps } from './CollectionBanner.types';
import { useStoreState } from '../../store';
import { useRouter } from 'next/router';
import BaseImage from '../ui/Base/BaseImage/BaseImage';

const CollectionBanner = ({
  uid,
  name,
  image,
  volume,
  floor,
  sales,
  index,
  owners,
  supply,
}: ICollectionBannerProps) => {
  const { currency } = useStoreState((state) => state.wallet);
  const router = useRouter();

  const collectionRoute = name.split(' ').join('-').toLowerCase();

  return (
    <>
      {index === 1 && (
        <div className={styles.tableHeader}>
          <p className={styles.collectionName}>Collection</p>
          <p className={styles.floor}>Floor</p>
          <p className={styles.volume}>Volume</p>
          <p className={styles.sales}>Sales</p>
          <p className={styles.owners}>Owners</p>
          <p className={styles.supply}>Total Supply</p>
        </div>
      )}
      <div
        className={styles.container}
        onClick={() =>
          router.push(
            {
              pathname: `/collections/${collectionRoute}`,
              query: { uid: uid },
            },
            `/collections/${collectionRoute}`
          )
        }
      >
        <div className={styles.collectionName}>
          {index && <p>{index}</p>}
          <div className={styles.image}>
            <BaseImage imageUrl={image} />
          </div>
          <p>{name}</p>
        </div>
        <p className={styles.floor}>
          {floor === 0 ? ' - ' : `${floor?.toString()} ${currency}`}
        </p>
        {volume ? (
          <p className={styles.volume}>
            {volume} {currency}
          </p>
        ) : (
          <p className={styles.volume}>0</p>
        )}
        {sales ? (
          <p className={styles.sales}>{sales} </p>
        ) : (
          <p className={styles.sales}>0</p>
        )}
        {owners ? (
          <p className={styles.owners}>{owners} </p>
        ) : (
          <p className={styles.owners}>0</p>
        )}
        {supply ? (
          <p className={styles.supply}>{supply} </p>
        ) : (
          <p className={styles.supply}>0</p>
        )}
      </div>
    </>
  );
};

export default CollectionBanner;
