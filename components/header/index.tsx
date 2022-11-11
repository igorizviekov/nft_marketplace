import styles from './header.module.scss';
import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import LightLogo from '../../assets/img/logo.svg';
import DarkLogo from '../../assets/img/logo2.svg';
import { FiMoon, FiSun } from 'react-icons/fi';

export const Header = () => {
  const { theme, setTheme } = useTheme();

  const classNames = [
    'flexBetween',
    'dark:bg-nft-dark',
    'dark:border-nft-black-1',
    styles['header'],
  ].join(' ');

  const logo = theme === 'light' ? LightLogo : DarkLogo;

  return (
    <nav className={classNames}>
      <div className={styles['header__link']}>
        <Link href="/">
          <div className={styles['header__link__logo']} onClick={() => null}>
            <Image src={logo} alt="logo" width={26} />
          </div>
        </Link>
      </div>
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
            <FiMoon color="cornflowerblue" size={13} />
            <div
              className={[
                'ball',
                styles['header__theme__toggle__label__ball'],
              ].join(' ')}
            />
          </label>
        </div>
      </div>
    </nav>
  );
};
