import React, { useEffect, useRef, useState } from 'react';
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
import { useStoreActions, useStoreState } from '../../store';
import DropdownMenuItem from '../header/DropdownMenu/DropdownMenuItem/DropdownMenuItem';
import { useOutsideAlerter } from '../../hooks/useOutsideAlerter';
const NetworkDropdown = ({ networks, isLoading }: INetworkProps) => {
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

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

  const { selectedBlockchain, blockchains } = useStoreState(
    (state) => state.app
  );
  const { setSelectedBlockchain } = useStoreActions((actions) => actions.app);

  useOutsideAlerter(
    ref,
    () => setMenuOpen(false),
    () => setMenuOpen(true)
  );

  return (
    <>
      {blockchains && (
        <div ref={ref} className={styles.container}>
          <Button isPrimary={false} className={styles.container}>
            <>
              {selectedBlockchain && (
                <div className={styles.selected}>
                  <NetworkIcon symbol={selectedBlockchain.currency_symbol} />
                  <h3>{selectedBlockchain.currency_symbol}</h3>
                </div>
              )}
              <Icon icon={<BsChevronDown />} />
            </>
          </Button>

          {isMenuOpen && (
            <div className={styles.menuItems}>
              {blockchains.map((blockchain, index) => {
                if (
                  blockchain.currency_symbol !==
                  selectedBlockchain?.currency_symbol
                ) {
                  return (
                    <DropdownMenuItem
                      key={index + blockchain.currency_symbol}
                      label={blockchain.currency_symbol}
                      icon={<NetworkIcon symbol={blockchain.currency_symbol} />}
                      onClick={() => setSelectedBlockchain(blockchain)}
                      className={styles.networkItem}
                    />
                  );
                }
              })}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default NetworkDropdown;
