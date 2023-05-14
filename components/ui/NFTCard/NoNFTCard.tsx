import { useStoreState } from 'easy-peasy';
import { IStoreModel } from '../../../store/model/model.types';
import styles from './NFTCard.module.scss';
import BaseImage from '../Base/BaseImage/BaseImage';
import PhoenixMint from '../../../assets/icons/mint_logo.svg';
export const NoNFTCard = () => {
  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <BaseImage imageUrl={PhoenixMint} />
      </div>
      <div className={styles.text}>
        <div className={styles.name}>
          <h1>{'No NFT was found'}</h1>
        </div>
        <div className={styles.bottom}></div>
      </div>
    </div>
  );
};
