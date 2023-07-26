import React from 'react';
import styles from './NFTCard.module.scss';
import { IShimmerNFTCardProps } from './ShimmerNFTCard.types';
import BaseImage from '../Base/BaseImage/BaseImage';
import { toast } from 'react-toastify';
import Shimmer from '../../../assets/icons/network-icons/Shimmer';
import Icon from '../Icon/Icon';
import { FaArrowRight } from 'react-icons/fa';
import { useStoreActions } from '../../../store';
import { useRouter } from 'next/router';

const ShimmerNFTCard = ({ nft }: IShimmerNFTCardProps) => {
  const { setNFT } = useStoreActions((actions) => actions.nftView);
  const router = useRouter();

  const handleClick = () => {
    if (nft) setNFT(nft);

    router.push(`/nft/${nft?.metadata.name}`);
  };

  return (
    <div className={styles.card}>
      <div className={styles.image}>
        {nft && <BaseImage imageUrl={nft.metadata?.image} />}
      </div>
      <div className={styles.text}>
        <div className={styles.name}>
          {nft && <h2>{nft.metadata?.name}</h2>}
          <p
            className={styles.collectionName}
            onClick={() => toast.warn('OpenCollection')}
          >
            {nft.collection?.metadata.name}
          </p>
        </div>
        <div className={styles.bottom}>
          <div className={styles.price}>
            <Icon icon={<Shimmer className={styles.icon} />} />
            {nft?.metadata && <h2>{nft.metadata.price}</h2>}
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

export default ShimmerNFTCard;
