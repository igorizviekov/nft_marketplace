import React, { useEffect, useState } from 'react';
import { ILaunchpadDropsProps } from './LaunchpadDrops.types';
import styles from './LaunchpadDrops.module.scss';
import BaseImage from '../ui/Base/BaseImage/BaseImage';
import classNames from 'classnames';
import Icon from '../ui/Icon/Icon';
import { FaBitcoin, FaEthereum } from 'react-icons/fa';
import { SiPrometheus } from 'react-icons/si';
import { useDateCountdown } from './utils';
const LaunchpadDrops = ({
  image,
  network,
  name,
  launchDate,
  isCategory,
}: ILaunchpadDropsProps) => {
  const [countdown, setCoundown] = useState<string>('');

  const icon =
    network === 'ETH' ? (
      <FaEthereum style={{ color: 'black', width: '30px', height: '30px' }} />
    ) : network === 'SMR' ? (
      <FaBitcoin style={{ color: 'black', width: '30px', height: '30px' }} />
    ) : (
      <SiPrometheus style={{ color: 'black', width: '30px', height: '30px' }} />
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
      {!isCategory && <p>{countdown}</p>}
      {isCategory && <p>Category</p>}
    </div>
  );
};

export default LaunchpadDrops;
