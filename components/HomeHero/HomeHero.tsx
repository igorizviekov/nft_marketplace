import React from 'react';
import { IHomeHeroProps } from './HomeHero.types';
import styles from './HomeHero.module.scss';
import BaseImage from '../ui/Base/BaseImage/BaseImage';
import { Button } from '../ui/Button';
const HomeHero = ({ title, copy, callToAction, href }: IHomeHeroProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h1>{title}</h1>
        <p>{copy}</p>
        <Button
          isPrimary={false}
          label={callToAction}
          onClick={function (): void {
            throw new Error('Function not implemented.');
          }}
        />
      </div>
      <div className={styles.imageContainer}>
        <BaseImage />
      </div>
    </div>
  );
};

export default HomeHero;
