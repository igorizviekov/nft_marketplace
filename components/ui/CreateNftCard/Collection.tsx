import classNames from 'classnames';
import React from 'react';
import styles from './CreateNftCard.module.scss';
import { ICreateNftCard } from './CreateNftCard.types';
const Collection = ({ onCollectionClick }: ICreateNftCard) => {
  return (
    <div className={classNames('flex-col-center', styles.container)} onClick={onCollectionClick}>
      <div className={styles.cardsContainer}>
        <div className={classNames(styles.first, styles.cards)} />
        <div className={classNames(styles.second, styles.cards)} />
        <div className={classNames(styles.third, styles.cards)} />
      </div>
      <h1>Collection</h1>
    </div>
  );
};

export default Collection;
