import React from 'react';
import Image from 'next/image';
import PhoenixMint from '../../assets/icons/phoenix_logo.svg';
import BaseImage from '../ui/Base/BaseImage/BaseImage';
import styles from './Spinner.module.scss';
export const Spinner = () => (
  <div className={styles.container}>
    <div className={styles.imageContainer}>
      <BaseImage imageUrl={PhoenixMint} />
    </div>
  </div>
);
