import styles from './Footer.module.scss';
import BaseImage from '../ui/Base/BaseImage/BaseImage';
import PhoenixMint from '../../assets/icons/phoenix_logo.svg';
import BaseLink from '../ui/Base/BaseLink/BaseLink';
export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.firstItems}>
        <div className={styles.logoContainer}>
          <div className={styles.image}>
            <BaseImage imageUrl={PhoenixMint} />
          </div>
          <h1>Phoenix Mint</h1>
        </div>

        <h3>©2023 Phoenix Mint, Inc. All Rights Reserved.</h3>
      </div>
      <div className={styles.marketplace}>
        <h4>Marketplace</h4>
        <BaseLink href={''}>Popular Collections</BaseLink>
        <BaseLink href={''}>New Launches</BaseLink>
      </div>
      <div className={styles.resources}>
        <h4>Resources</h4>
        <BaseLink href={''}>Support</BaseLink>
        <BaseLink href={''}>About us</BaseLink>
        <BaseLink href={''}>Copyright</BaseLink>
        <BaseLink href={''}>Terms & Privacy</BaseLink>
        <BaseLink href={'/sandbox'}>Smart Contracts</BaseLink>
      </div>
    </footer>
  );
};
