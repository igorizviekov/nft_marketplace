import React, { useMemo } from 'react';
import { IShimmerNFTCardProps } from '../ShimmerNFTCard.types';
import styles from '../NFTCard.module.scss';
import { FaArrowRight } from 'react-icons/fa';
import Icon from '../../Icon/Icon';
import Shimmer from '../../../../assets/icons/network-icons/Shimmer';
import { toast } from 'react-toastify';
import BaseImage from '../../Base/BaseImage/BaseImage';
import useBuyNFT from '../../../../service/nft/useBuyNFT';
import { ethers } from 'ethers';
import {
  CollectionsABI,
  MarketplaceABI,
  collectionsAddress,
  marketplaceAddress,
} from '../../../../mocks/constants.mock';
const ShimmerListedNFTCard = ({ nft }: IShimmerNFTCardProps) => {
  const provider = useMemo(
    () =>
      new ethers.providers.JsonRpcProvider(
        'https://json-rpc.evm.testnet.shimmer.network'
      ),
    []
  );
  const collectionContract = useMemo(() => {
    return new ethers.Contract(collectionsAddress, CollectionsABI, provider);
  }, []);

  const handleClick = () => {
    nft.uri && useBuyNFT(nft.id, 1, nft.uri);
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
            COLLECTION
          </p>
        </div>
        <div className={styles.bottom}>
          <div className={styles.price}>
            <Icon icon={<Shimmer className={styles.icon} />} />
            {nft?.metadata && <h2>{nft.metadata.price}</h2>}
          </div>
          <div className={styles.arrow} onClick={handleClick}>
            <p>Buy NFT</p>
            <Icon
              icon={<FaArrowRight style={{ width: '14px', height: '14px' }} />}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShimmerListedNFTCard;
