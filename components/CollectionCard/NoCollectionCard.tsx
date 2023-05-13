import React from 'react';
import styles from './CollectionCard.module.scss';
const NoCollectionCard = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.text}>No collection found</h1>
    </div>
  );
};

export default NoCollectionCard;
