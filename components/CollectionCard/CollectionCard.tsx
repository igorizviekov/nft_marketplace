import React, { useEffect, useState } from 'react';
import { ILaunchpadDropsProps } from './CollectionCard.types';
import styles from './CollectionCard.module.scss';
import BaseImage from '../ui/Base/BaseImage/BaseImage';
import classNames from 'classnames';
import Icon from '../ui/Icon/Icon';
import { FaArrowRight, FaBitcoin, FaEthereum } from 'react-icons/fa';
import { SiPrometheus } from 'react-icons/si';
import { useDateCountdown } from './utils';
import { toast } from 'react-toastify';
const LaunchpadDrops = ({
  image,
  network,
  name,
  launchDate,
  isCategory,
  category,
}: ILaunchpadDropsProps) => {
  const [countdown, setCoundown] = useState<string>('');

  const icon =
    network === 'ETH' ? (
      <FaEthereum style={{ color: '#1d1d1d', width: '30px', height: '30px' }} />
    ) : network === 'SMR' ? (
      <FaBitcoin style={{ color: '#1d1d1d', width: '30px', height: '30px' }} />
    ) : (
      <SiPrometheus
        style={{ color: '#1d1d1d', width: '30px', height: '30px' }}
      />
    );

  useEffect(() => {
    setCoundown(useDateCountdown(launchDate));

    const interval = setInterval(() => {
      setCoundown(useDateCountdown(launchDate));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  return (
    <div className={classNames('flex-col-center', styles.container)}>
      <div className={styles.image}>
        <Icon icon={icon} className={styles.network} />
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
      {isCategory && <p>{category}</p>}
    </div>
  );
};

export default LaunchpadDrops;
