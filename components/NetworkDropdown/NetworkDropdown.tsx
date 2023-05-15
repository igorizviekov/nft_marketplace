import React from 'react';
import styles from './NetworkDropdown.module.scss';
import { INetworkProps } from './NetworkDropdown.types';
import Ethereum from '../../assets/icons/network-icons/Ethereum';
import Shimmer from '../../assets/icons/network-icons/Shimmer';
import Polygon from '../../assets/icons/network-icons/Polygon';
import BinanceSC from '../../assets/icons/network-icons/BinanceSC';
import Solana from '../../assets/icons/network-icons/Solana';
import Icon from '../ui/Icon/Icon';
import { BsChevronDown } from 'react-icons/bs';
import { Button } from '../ui/Button';
import { toast } from 'react-toastify';
const NetworkDropdown = ({ networks, isLoading }: INetworkProps) => {
  const NetworkIcon = ({ symbol }: { symbol: string }) => {
    switch (symbol) {
      case 'SMR':
        return <Shimmer className={styles.icon} />;
      case 'ETH':
        return <Ethereum className={styles.icon} />;
      case 'MATIC':
        return <Polygon className={styles.icon} />;
      case 'BSC':
        return <BinanceSC className={styles.icon} />;
      default:
        return <Solana className={styles.icon} />;
    }
  };
  return (
    <Button
      isPrimary={false}
      className={styles.container}
      onClick={() => toast.warn('Open dropdooown')}
    >
      <>
        {networks &&
          !isLoading &&
          networks.map((network, index) => (
            <div className={styles.selected} key={index + network.id}>
              <NetworkIcon symbol={network.currency_symbol} />
              <h3>{network.currency_symbol}</h3>
            </div>
          ))}

        <Icon icon={<BsChevronDown />} />
      </>
    </Button>
  );
};

export default NetworkDropdown;
