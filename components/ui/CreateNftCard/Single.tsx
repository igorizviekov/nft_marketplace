import classNames from 'classnames';
import React from 'react';
import styles from './CreateNftCard.module.scss';
import { ICreateNftCard } from './CreateNftCard.types';
const Single = ({ onSingleClick }: ICreateNftCard) => {
  return (
    <div
      className={classNames('flex-col-center', styles.container)}
      onClick={onSingleClick}
    >
      <div className={styles.card} />
      <h1>Single</h1>
    </div>
  );
};

export default Single;
