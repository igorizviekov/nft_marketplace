import React, { useState } from 'react';
import { AiOutlinePoweroff } from 'react-icons/ai';
import { FaEthereum, FaFolderOpen } from 'react-icons/fa';
import { IoIosWallet, IoMdSettings } from 'react-icons/io';
import { TbRefresh } from 'react-icons/tb';
import { useStoreState } from '../../../store';
import { Button } from '../../ui/Button';
import styles from './DropdownMenu.module.scss';
import { IDropdownMenu } from './DropdownMenu.types';
import DropdownMenuItem from './DropdownMenuItem/DropdownMenuItem';
const DropdownMenu = ({}: IDropdownMenu) => {
  const walletState = useStoreState((state) => state.wallet);

  const walletStart =
    walletState.activeWallet && walletState.activeWallet.slice(0, 5);
  const walletEnds =
    walletState.activeWallet && walletState.activeWallet.slice(38, 42);

  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <div className={styles.menu}>
      {walletState.activeWallet && (
        <Button
          isPrimary={false}
          label={walletStart + '...' + walletEnds}
          onClick={() => setMenuOpen(!isMenuOpen)}
        />
      )}
      {isMenuOpen && (
        <div className={styles.container}>
          <DropdownMenuItem
            label={'My Items'}
            icon={<FaFolderOpen />}
            href={'/profile'}
          />
          <DropdownMenuItem
            label={'Profile Settings'}
            icon={<IoMdSettings />}
            href={'/edit'}
          />
          <DropdownMenuItem
            label={'Balance: 0.00'}
            icon={<FaEthereum />}
            href={''}
          />
          <DropdownMenuItem
            label={'Manage Wallets'}
            icon={<IoIosWallet />}
            href={'/wallets'}
          />
          <DropdownMenuItem
            label={'Connect a different wallet'}
            icon={<TbRefresh />}
            href={'/connect-wallet'}
          />
          <DropdownMenuItem
            label={'Disconnect wallet'}
            icon={<AiOutlinePoweroff />}
            href={'/disconnect'}
          />
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
