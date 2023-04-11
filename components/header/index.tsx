import styles from './header.module.scss';
import { useState, useEffect } from 'react';
import { NextRouter, useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import LightLogo from '../../assets/img/logo.svg';
import DarkLogo from '../../assets/img/logo2.svg';
import { FiMoon, FiSun } from 'react-icons/fi';
import { MenuItems } from './MenuItems';
import { BurgerMenu } from './BurgerMenu';
import { Actions, useStoreActions, useStoreState } from 'easy-peasy';
import { IStoreModel } from '../../store/model/model.types';
import { ConnectWallet, connectWallet } from '../../utils';
import Lottie from 'lottie-react';
import metaMaskIcon from '../../assets/icons/metamask-icon.json';
import { toast } from 'react-toastify';
import { MenuTab } from '../../store/model/ui/ui.types';
import { UserLogin } from '../user-login';
import { Button } from '../ui/Button';
import ShimmerLogo from '../../assets/icons/chains/shimmer.svg';
import PolygonLogo from '../../assets/icons/chains/polygon.svg';

export const Header = () => {
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  const [isSideMenuOpen, setSideMenuOpen] = useState(false);
  const [menuTabs, setMenuTabs] = useState<MenuTab[]>(['Explore']);

  const classNames = [
    'flexBetween',
    'dark:bg-nft-black-1',
    'dark:border-nft-black-1',
    styles['header'],
  ].join(' ');

  const [logo, setLogo] = useState(DarkLogo);

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

  useEffect(() => {
    if (theme !== 'dark') {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    if (logo && theme === 'light') {
      setLogo(LightLogo);
    }
    if (logo && theme === 'dark') {
      setLogo(DarkLogo);
    }
  }, [theme]);

  const themeToggle = (
    <div className={styles['header__theme']}>
      <div className={styles['header__theme__toggle']}>
        <input
          type="checkbox"
          className="checkbox"
          id="checkbox"
          checked={theme === 'dark'}
          onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        />
        <label
          htmlFor="checkbox"
          className={[
            'label',
            'flexBetween',
            styles['header__theme__toggle__label'],
          ].join(' ')}
        >
          <FiSun color="yellow" size={13} />
          <FiMoon color="white" size={12} />
          <div
            className={[
              'ball',
              styles['header__theme__toggle__label__ball'],
            ].join(' ')}
          />
        </label>
      </div>
    </div>
  );

  const chainToggle = (
    <div className={styles['header__theme']}>
      <div className={styles['header__theme__toggle']}>
        <input
          type="checkbox"
          className="checkbox"
          id="chain"
          checked={walletState.currency === 'MATIC'}
          onChange={() =>
            walletActions.setCurrency(
              walletState.currency === 'MATIC' ? 'SHMR' : 'MATIC'
            )
          }
        />
        <label
          htmlFor="chain"
          className={[
            'label',
            'flexBetween',
            styles['header__theme__toggle__label'],
          ].join(' ')}
        >
          <Image priority src={PolygonLogo} alt="Polygon" width={12} />
          <Image priority src={ShimmerLogo} alt="Polygon" width={16} />

          <div
            className={[
              'ball',
              styles['header__theme__toggle__label__ball'],
            ].join(' ')}
          />
        </label>
      </div>
    </div>
  );

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
        setSideMenuOpen(false);
        router.push('/create-nft');
      }
    : () => connectCryptoWallet('active');

  const actionBtn = (
    <div className="animate-fadeIn flex gap-6 sm:flex-col">
      <Button label={NftBtnLabel} onClick={NftBtnHandler} isPrimary />
      <UserLogin />
    </div>
  );

  const headerContent = (
    <div className={styles['header__menu-items']}>
      {themeToggle}
      <MenuItems
        links={menuTabs}
        active={state.tab}
        setActiveTab={actions.toggleTab}
      />
      {chainToggle}
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
            <Image src={logo} alt="logo" width={26} />
          </div>
        </Link>
      </div>
      {headerContent}
      <BurgerMenu
        isOpen={isSideMenuOpen}
        onToggle={() => setSideMenuOpen((prev) => !prev)}
        controls={actionBtn}
        links={menuTabs}
      />
    </nav>
  );
};
