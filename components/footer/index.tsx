import styles from './Footer.module.scss';
import BaseImage from '../ui/Base/BaseImage/BaseImage';
import PhoenixMint from '../../assets//icons/phoenix_logo.svg';
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
        <h3>Popular Collections</h3>
        <h3>New Launches</h3>
      </div>
      <div className={styles.resources}>
        <h4>Resources</h4>
        <h3>Support</h3>
        <h3>About us</h3>
        <h3>Copyright</h3>
        <h3>Termns & Privacy</h3>
      </div>
    </footer>
  );
};
