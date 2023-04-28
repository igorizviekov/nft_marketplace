import styles from './header.module.scss';
import { useState, useEffect } from 'react';
import { NextRouter, useRouter } from 'next/router';
import Link from 'next/link';
import MenuItems from './MenuItems/MenuItems';
import { Actions, useStoreActions, useStoreState } from 'easy-peasy';
import { IStoreModel } from '../../store/model/model.types';
import { ConnectWallet, connectWallet } from '../../utils';
import { toast } from 'react-toastify';
import { MenuTab } from '../../store/model/ui/ui.types';
import { Button } from '../ui/Button';
import DropdownMenu from './DropdownMenu/DropdownMenu';
import { FaPhoenixSquadron } from 'react-icons/fa';
import Icon from '../ui/Icon/Icon';

export const Header = () => {
  const [menuTabs, setMenuTabs] = useState<MenuTab[]>([]);

  const classNames = [
    'flexBetween',
    'dark:bg-nft-black-1',
    'dark:border-nft-black-1',
    styles['header'],
  ].join(' ');

  const state = useStoreState((state: IStoreModel) => state.ui);
  const actions = useStoreActions(
    (actions: Actions<IStoreModel>) => actions.ui
  );

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
    const { isConnected } = wallet;

    walletActions.setIsWalletConnected(isConnected);
    if (isConnected) {
      walletActions.setActiveWallet(wallet.account);
      setMenuTabs(['Listed', 'My NFTs']);
      if (mode === 'active') {
        location.reload();
      }
    } else {
      mode === 'active'
        ? toast.error('No accounts found.')
        : console.log('Wallet is not connected');
    }
  };

  useEffect(() => {
    connectCryptoWallet('silent');
  }, []);

  const NftBtnLabel = 'Connect Wallet';

  const actionBtn = (
    <>
      {!walletState.isWalletConnected && (
        <Button
          label={NftBtnLabel}
          onClick={() => connectCryptoWallet('active')}
          isPrimary={true}
        />
      )}
      <DropdownMenu />
    </>
  );

  const headerContent = (
    <div className={styles['header__menu-items']}>
      <MenuItems
        links={menuTabs}
        active={state.tab}
        setActiveTab={actions.toggleTab}
      />
      {actionBtn}
    </div>
  );

  return (
    <nav className={classNames}>
      <div className={styles['header__link']}>
        <Link href="/">
          <div className={styles['header__link__logo']}>
            <Icon
              icon={
                <FaPhoenixSquadron style={{ width: '50px', height: '50px' }} />
              }
            />
          </div>
        </Link>
      </div>
      {headerContent}
    </nav>
  );
};
