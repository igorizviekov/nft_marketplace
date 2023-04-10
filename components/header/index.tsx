import styles from './header.module.scss';
import { useState, useEffect } from 'react';
import { NextRouter, useRouter } from 'next/router';
import Link from 'next/link';
import { MenuItems } from './MenuItems';
import { Actions, useStoreActions, useStoreState } from 'easy-peasy';
import { IStoreModel } from '../../store/model/model.types';
import { ConnectWallet, connectWallet } from '../../utils';
import Lottie from 'lottie-react';
import metaMaskIcon from '../../assets/icons/metamask-icon.json';
import { toast } from 'react-toastify';
import { MenuTab } from '../../store/model/ui/ui.types';
import { Button } from '../ui/Button';
import DropdownMenu from './DropdownMenu/DropdownMenu';
import { FaPhoenixSquadron } from 'react-icons/fa';
import Icon from '../ui/Icon/Icon';

export const Header = () => {
  const router = useRouter();
  const [menuTabs, setMenuTabs] = useState<MenuTab[]>(['Explore']);

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
      setMenuTabs(['Explore', 'Listed', 'My NFTs']);
      if (mode === 'active') {
        location.reload();
      }
    } else {
      mode === 'active'
        ? toast.error('No accounts found.')
        : console.log('Wallet is not connected');
    }
  };

  const checkActive = (active: MenuTab, router: NextRouter) => {
    switch (router.pathname) {
      case '/':
        if (active !== 'Explore') actions.toggleTab('Explore');
        break;
      case '/listed':
        if (active !== 'Listed') actions.toggleTab('Listed');
        break;
      case '/my-nft':
        if (active !== 'My NFTs') actions.toggleTab('My NFTs');
        break;
      default:
        actions.toggleTab('');
        break;
    }
  };

  // update active tab state depending from the route
  useEffect(() => {
    checkActive(state.tab, router);
  }, [router.pathname]);

  useEffect(() => {
    connectCryptoWallet('silent');
  }, []);

  const NftBtnLabel = walletState.isWalletConnected ? (
    'Create'
  ) : (
    <span className="flexCenter gap-5">
      Connect
      <Lottie
        animationData={metaMaskIcon}
        loop={false}
        style={{ height: 20 }}
      />
    </span>
  );

  const NftBtnHandler = walletState.isWalletConnected
    ? () => {
        router.push('/create-nft');
      }
    : () => connectCryptoWallet('active');

  const actionBtn = (
    <div className="animate-fadeIn flex gap-6 sm:flex-col">
      <Button label={NftBtnLabel} onClick={NftBtnHandler} isPrimary />
      <DropdownMenu />
    </div>
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
          <div
            className={styles['header__link__logo']}
            onClick={() => actions.toggleTab('Explore')}
          >
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
