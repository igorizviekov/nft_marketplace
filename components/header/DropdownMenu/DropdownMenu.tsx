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

  const walletStart = walletState.activeWallet.slice(0, 5);
  const walletEnds = walletState.activeWallet.slice(38, 42);

  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <div className={styles.menu}>
      <Button
        isPrimary={false}
        label={walletStart + '...' + walletEnds}
        onClick={() => setMenuOpen(!isMenuOpen)}
      />
      {isMenuOpen && (
        <div className={styles.container}>
          <DropdownMenuItem label={'My Items'} icon={<FaFolderOpen />} />
          <DropdownMenuItem
            label={'Profile Settings'}
            icon={<IoMdSettings />}
          />
          <DropdownMenuItem label={'Balance: 0.00'} icon={<FaEthereum />} />
          <DropdownMenuItem label={'Manage Wallets'} icon={<IoIosWallet />} />
          <DropdownMenuItem
            label={'Connect a different wallet'}
            icon={<TbRefresh />}
          />
          <DropdownMenuItem
            label={'Disconnect wallet'}
            icon={<AiOutlinePoweroff />}
          />
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
