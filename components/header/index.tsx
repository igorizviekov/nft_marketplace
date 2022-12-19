import styles from './header.module.scss';
import { useState, useEffect, Dispatch } from 'react';
import { NextRouter, useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import LightLogo from '../../assets/img/logo.svg';
import DarkLogo from '../../assets/img/logo2.svg';
import { FiMoon, FiSun } from 'react-icons/fi';
import { MenuItems } from './MenuItems';
import { ButtonGroup } from '../ui/ButtonGroup';
import { BurgerMenu } from './BurgerMenu';
import { Actions, useStoreActions, useStoreState } from 'easy-peasy';
import { IStoreModel } from '../../store/model/model.types';
import { ConnectWallet, connectWallet } from '../../utils';
import Lottie from 'lottie-react';
import metaMaskIcon from '../../assets/icons/metamask-icon.json';
import { toast } from 'react-toastify';
import { MenuTab } from '../../store/model/ui/ui.types';

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
      return toast.error(
        'Please add Metamask extension in your browser to continue'
      );
    }
    const wallet = await connectWallet(mode);
    const { isConnected } = wallet;
    walletActions.setIsWalletConnected(isConnected);
    if (isConnected) {
      walletActions.setActiveWallet(wallet.account);
      setMenuTabs(['Explore', 'Listed', 'My NFTs']);
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
    if (theme === 'light') {
      setLogo(LightLogo);
    } else {
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

  const menuItems = (
    <MenuItems
      isMob={false}
      links={menuTabs}
      active={state.tab}
      setActiveTab={actions.toggleTab}
    />
  );

  const createNFTBtn = {
    label: <div>Create</div>,
    handleClick: () => {
      setSideMenuOpen(false);
      router.push('/create-nft');
    },
  };

  const connectWalletBtn = {
    label: (
      <span className="flexCenter gap-5">
        Connect
        <Lottie
          animationData={metaMaskIcon}
          loop={false}
          style={{ height: 30 }}
        />
      </span>
    ),
    handleClick: () => connectCryptoWallet('active'),
  };

  const btnOptions = [
    walletState.isWalletConnected ? createNFTBtn : connectWalletBtn,
  ];

  const headerContent = (
    <div className={styles['header__menu-items']}>
      {themeToggle}
      {menuItems}
      <ButtonGroup options={btnOptions} />
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
        onToggle={() => setSideMenuOpen(!isSideMenuOpen)}
        actions={btnOptions}
        menuItems={menuItems}
      />
    </nav>
  );
};
