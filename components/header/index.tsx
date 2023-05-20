import styles from './header.module.scss';
import { useEffect } from 'react';
import Link from 'next/link';
import { useStoreActions, useStoreState } from '../../store';
import { ConnectWallet, connectWallet } from '../../utils';
import { toast } from 'react-toastify';
import { Button } from '../ui/Button';
import DropdownMenu from './DropdownMenu/DropdownMenu';
import PhoenixLogo from '../../assets/icons/phoenix_logo.svg';
import LogoText from '../../assets/icons/text-logo.png';
import BaseImage from '../ui/Base/BaseImage/BaseImage';
import { Searchbar } from '../Searchbar/Searchbar';
import { useFetchAppData } from '../../service/useFetchAppData';
import NetworkDropdown from '../NetworkDropdown/NetworkDropdown';
import { useAuth } from '../../service/useAuth';

export const Header = () => {
  const { isWalletConnected, activeWallet } = useStoreState(
    (state) => state.wallet
  );
  const { setIsWalletConnected, setActiveWallet } = useStoreActions(
    (actions) => actions.wallet
  );
  const { blockchains, isLoading } = useStoreState((state) => state.app);

  const connectCryptoWallet = async (mode: ConnectWallet) => {
    if (!window.ethereum) {
      if (mode === 'active') {
        toast.info('Please add Metamask extension in your browser');
      }
      return;
    }
    const wallet = await connectWallet(mode);
    const { isConnected, account } = wallet;

    setIsWalletConnected(isConnected);
    setActiveWallet(account);
  };

  useAuth();
  useFetchAppData();
  useEffect(() => {
    connectCryptoWallet('silent');
  }, []);

  const actionBtn = (
    <>
      {!isWalletConnected && (
        <Button
          label={'Connect Wallet'}
          onClick={() => connectCryptoWallet('active')}
          isPrimary={true}
        />
      )}
      <DropdownMenu />
    </>
  );

  return (
    <nav className={styles.header}>
      <Link href="/">
        <div className={styles.network}>
          <div className="flex-row-start">
            <div className={styles.logo}>
              <BaseImage imageUrl={PhoenixLogo} />
            </div>
            <div className={styles.logoText}>
              <BaseImage imageUrl={LogoText} className={styles.text} />
            </div>
          </div>
        </div>
      </Link>
      <div className={styles.searchBar}>
        <Searchbar
          onHandleSearch={() => console.log('should serach')}
          onClearSearch={() => console.log('clear search')}
        />
      </div>
      <div className={styles.network}>
        {blockchains && (
          <NetworkDropdown isLoading={isLoading} networks={blockchains} />
        )}
        {actionBtn}
      </div>
    </nav>
  );
};
