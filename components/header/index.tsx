import styles from './header.module.scss';
import { useEffect } from 'react';
import Link from 'next/link';
import { Actions, useStoreActions, useStoreState } from 'easy-peasy';
import { IStoreModel } from '../../store/model/model.types';
import { ConnectWallet, connectWallet } from '../../utils';
import { toast } from 'react-toastify';
import { Button } from '../ui/Button';
import DropdownMenu from './DropdownMenu/DropdownMenu';
import PhoenixLogo from '../../assets/icons/phoenix_logo.svg';
import BaseImage from '../ui/Base/BaseImage/BaseImage';
import { Searchbar } from '../Searchbar/Searchbar';

export const Header = () => {
  const walletState = useStoreState((state: IStoreModel) => state.wallet);
  const walletActions = useStoreActions(
    (actions: Actions<IStoreModel>) => actions.wallet
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

    walletActions.setIsWalletConnected(isConnected);
    walletActions.setActiveWallet(account);
  };

  useEffect(() => {
    connectCryptoWallet('silent');
  }, []);

  const actionBtn = (
    <>
      {!walletState.isWalletConnected && (
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
