import React from 'react';
import { IHomeHeroProps } from './HomeHero.types';
import styles from './HomeHero.module.scss';
import BaseImage from '../ui/Base/BaseImage/BaseImage';
import { Button } from '../ui/Button';
import PhoenixLogo from '../../assets/icons/phoenix_logo.svg';
import LogoText from '../../assets/icons/text-logo.png';

const HomeHero = ({ title, copy, callToAction, href }: IHomeHeroProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <div className={styles.network}>
          <div className="flex-row-start">
            <div className={styles.logo}>
              <BaseImage imageUrl={PhoenixLogo} />
            </div>
            <div className={styles.logoText}>
              <BaseImage imageUrl={LogoText} className={styles.text} />
            </div>
          </div>
        </div>
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
        <BaseImage isHero />
      </div>
    </div>
  );
};

export default HomeHero;
