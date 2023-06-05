import { useStoreActions, useStoreState } from '../../../store';
import Image from 'next/image';
import { IStoreModel } from '../../../store/model/model.types';
import styles from './NFTCard.module.scss';
import { toast } from 'react-toastify';
import Icon from '../Icon/Icon';
import { FaArrowRight, FaEthereum } from 'react-icons/fa';
import { INftCardProps } from './NFTCard.types';
import { useRouter } from 'next/router';

export const NftCard = ({ nft }: INftCardProps) => {
  const { currency } = useStoreState((state) => state.wallet);
  const { setNFT } = useStoreActions((actions) => actions.nftView);
  const router = useRouter();

  const handleClick = () => {
    if (nft) setNFT(nft);

    router.push(`/nft/${nft?.id.tokenId}`);
  };
  return (
    <div className={styles.card}>
      <div className={styles.image}>
        {nft && (
          <Image
            src={nft.contractMetadata.openSea.imageUrl}
            alt="nft"
            fill
            sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
            style={{
              objectFit: 'cover',
            }}
          />
        )}
      </div>
      <div className={styles.text}>
        <div className={styles.name}>
          <h2>{nft?.title}</h2>
          <p
            className={styles.collectionName}
            onClick={() => toast.warn('OpenCollection')}
          >
            {nft?.contractMetadata.openSea.collectionName}
          </p>
        </div>
        <div className={styles.bottom}>
          <div className={styles.price}>
            <Icon icon={<FaEthereum />} />
            <h2>{nft?.contractMetadata.openSea.floorPrice}</h2>
          </div>
          <div className={styles.arrow} onClick={handleClick}>
            <p>View</p>
            <Icon
              icon={<FaArrowRight style={{ width: '14px', height: '14px' }} />}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
