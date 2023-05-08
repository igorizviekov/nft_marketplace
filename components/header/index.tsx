import styles from './header.module.scss';
import { useEffect } from 'react';
import Link from 'next/link';
import { useStoreActions, useStoreState } from '../../store';
import { ConnectWallet, connectWallet } from '../../utils';
import { toast } from 'react-toastify';
import { Button } from '../ui/Button';
import DropdownMenu from './DropdownMenu/DropdownMenu';
import PhoenixLogo from '../../assets/icons/phoenix_logo.svg';
import BaseImage from '../ui/Base/BaseImage/BaseImage';
import { Searchbar } from '../Searchbar/Searchbar';

export const Header = () => {
  const { isWalletConnected } = useStoreState((state) => state.wallet);
  const { setIsWalletConnected, setActiveWallet } = useStoreActions(
    (actions) => actions.wallet
  );

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
        <div className={styles.logo}>
          <BaseImage imageUrl={PhoenixLogo} />
        </div>
      </Link>
      <Searchbar
        onHandleSearch={() => console.log('should serach')}
        onClearSearch={() => console.log('clear search')}
      />
      <div className={styles.network}>
        <p>Network Dropdown</p>
        {actionBtn}
      </div>
    </nav>
  );
};
