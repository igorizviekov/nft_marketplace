import styles from './NFTCard.module.scss';
export const NoNFTCard = () => {
  return (
    <div className={styles.notFound}>
      <div className={styles.name}>
        <h1>{'No NFT was found'}</h1>
      </div>
    </div>
  );
};
