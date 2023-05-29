import React, { useEffect, useState } from 'react';
import { ILaunchpadDropsProps } from './CollectionCard.types';
import styles from './CollectionCard.module.scss';
import BaseImage from '../ui/Base/BaseImage/BaseImage';
import classNames from 'classnames';
import Icon from '../ui/Icon/Icon';
import { FaArrowRight, FaEthereum } from 'react-icons/fa';
import { useDateCountdown } from './utils';
import { toast } from 'react-toastify';
import { useStoreState } from '../../store';
import Shimmer from '../../assets/icons/network-icons/Shimmer';
import Ethereum from '../../assets/icons/network-icons/Ethereum';
import Polygon from '../../assets/icons/network-icons/Polygon';
import BinanceSC from '../../assets/icons/network-icons/BinanceSC';
const LaunchpadDrops = ({
  image,
  network,
  name,
  launchDate,
  isCategory,
  primaryCategory,
  secondaryCategory,
}: ILaunchpadDropsProps) => {
  const { blockchains } = useStoreState((state) => state.app);
  const [countdown, setCoundown] = useState<string>('');
  const foundNetwork = blockchains.find(
    (blockchain) => blockchain.id === network
  );
  const icon =
    foundNetwork?.currency_symbol === 'ETH' ? (
      <Ethereum className={styles.network} />
    ) : foundNetwork?.currency_symbol === 'SMR' ? (
      <Shimmer className={styles.network} />
    ) : foundNetwork?.currency_symbol === 'MATIC' ? (
      <Polygon className={styles.network} />
    ) : (
      foundNetwork?.currency_symbol === 'BSC' && (
        <BinanceSC className={styles.network} />
      )
    );

  useEffect(() => {
    if (launchDate) {
      setCoundown(useDateCountdown(launchDate));

      const interval = setInterval(() => {
        setCoundown(useDateCountdown(launchDate));
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }
  });

  return (
    <div className={classNames(styles.container)}>
      <div className={styles.image}>
        {icon && <Icon icon={icon} />}
        <BaseImage imageUrl={image} />
      </div>
      <h2>{name}</h2>
      {!isCategory &&
        (countdown === 'end' ? (
          <div
            className={styles.arrow}
            onClick={() => toast.warn('View collection')}
          >
            <p>View</p>
            <Icon
              icon={<FaArrowRight style={{ width: '14px', height: '14px' }} />}
            />
          </div>
        ) : (
          <p>{countdown}</p>
        ))}
      {isCategory && (
        <div>
          <p>{primaryCategory}</p>
          <p>{secondaryCategory}</p>
        </div>
      )}
    </div>
  );
};

export default LaunchpadDrops;
