import styles from './header.module.scss';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
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
import { connectWallet } from '../../utils';

export const Header = () => {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const menuTabs = ['Explore', 'Feed', 'Account'];
  const [isSideMenuOpen, setSideMenuOpen] = useState(false);

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

  const connectCryptoWallet = async () => {
    if (!window.ethereum) {
      return alert('wallet is not connected');
    }
    const wallet = await connectWallet('active');
    const { isConnected } = wallet;
    walletActions.setIsWalletConnected(isConnected);
    if (isConnected) {
      walletActions.setActiveWallet(wallet.account);
    } else {
      alert('No accounts found.');
    }
  };

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
    label: <span>Create</span>,
    handleClick: () => {
      setSideMenuOpen(false);
      router.push('/create-nft');
    },
  };

  const connectWalletBtn = {
    label: 'Connect Wallet',
    handleClick: connectCryptoWallet,
  };
  console.log(walletState);
  const headerContent = (
    <div className={styles['header__menu-items']}>
      {themeToggle}
      {menuItems}
      <ButtonGroup
        options={[
          walletState.isWalletConnected ? createNFTBtn : connectWalletBtn,
        ]}
      />
    </div>
  );

  return (
    <nav className={classNames}>
      <div className={styles['header__link']}>
        <Link href="/">
          <div className={styles['header__link__logo']} onClick={() => null}>
            <Image src={logo} alt="logo" width={26} />
          </div>
        </Link>
      </div>
      {headerContent}
      <BurgerMenu
        isOpen={isSideMenuOpen}
        onToggle={() => setSideMenuOpen(!isSideMenuOpen)}
        actions={[
          walletState.isWalletConnected
            ? {
                label: 'Create',
                handleClick: () => {
                  setSideMenuOpen(false);
                  router.push('/create-nft');
                },
              }
            : {
                label: 'Connect Wallet',
                handleClick: () => console.log('connecting a wallet...'),
              },
        ]}
        menuItems={menuItems}
      />
    </nav>
  );
};
