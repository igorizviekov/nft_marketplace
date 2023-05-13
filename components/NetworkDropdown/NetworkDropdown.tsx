import React from 'react';
import styles from './NetworkDropdown.module.scss';
import { INetworkProps } from './NetworkDropdown.types';
import Ethereum from '../../assets/icons/network-icons/ethereum.svg';
import Shimmer from '../../assets/icons/network-icons/Shimmer';
import Polygon from '../../assets/icons/network-icons/polygon.svg';
import BinanceSC from '../../assets/icons/network-icons/bsc.svg';
import Image from 'next/image';
import Icon from '../ui/Icon/Icon';
import { BsChevronDown } from 'react-icons/bs';
const NetworkDropdown = ({ networks, isLoading }: INetworkProps) => {
  const NetworkIcon = ({ symbol }: { symbol: string }) => {
    switch (symbol) {
      case 'SMR':
        return <Icon icon={<Shimmer className={styles.icon} />} />;
      case 'ETH':
        return <Image src={Ethereum} alt={'Shimmer'} />;
      case 'MATIC':
        return <Image src={Polygon} alt={'Shimmer'} />;
      case 'BSC':
        return <Image src={BinanceSC} alt={'Shimmer'} />;
      default:
        return <Image src={BinanceSC} alt={'Shimmer'} />;
    }
  };
  return (
    <div className={styles.container}>
      {networks &&
        !isLoading &&
        networks.map((network, index) => (
          <div className={styles.selected} key={index + network.id}>
            <NetworkIcon symbol={network.currency_symbol} />
            <h3>{network.currency_symbol}</h3>
          </div>
        ))}

      <Icon icon={<BsChevronDown />} />
    </div>
  );
};

export default NetworkDropdown;
