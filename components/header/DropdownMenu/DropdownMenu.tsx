import React, { useRef, useState } from 'react';
import { AiOutlinePlus, AiOutlinePoweroff } from 'react-icons/ai';
import { FaEthereum, FaFolderOpen } from 'react-icons/fa';
import { IoIosWallet, IoMdSettings } from 'react-icons/io';
import { GiEgyptianProfile } from 'react-icons/gi';
import { TbRefresh } from 'react-icons/tb';
import { useOutsideAlerter } from '../../../hooks/useOutsideAlerter';
import { useStoreState } from '../../../store';
import { Button } from '../../ui/Button';
import styles from './DropdownMenu.module.scss';
import { IDropdownMenu } from './DropdownMenu.types';
import DropdownMenuItem from './DropdownMenuItem/DropdownMenuItem';
import { toast } from 'react-toastify';
const DropdownMenu = ({}: IDropdownMenu) => {
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  const walletState = useStoreState((state) => state.wallet);

  const walletStart =
    walletState.activeWallet && walletState.activeWallet.slice(0, 5);
  const walletEnds =
    walletState.activeWallet && walletState.activeWallet.slice(38, 42);

  useOutsideAlerter(
    ref,
    () => setMenuOpen(!isMenuOpen),
    () => setMenuOpen(true)
  );
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
        <div className={styles.container} ref={ref}>
          <DropdownMenuItem
            label={walletStart + '...' + walletEnds}
            icon={<GiEgyptianProfile />}
            isNotLink
          />
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
            label={'Create NFT'}
            icon={<AiOutlinePlus />}
            href={'/create-nft'}
          />
          <DropdownMenuItem
            label={'Balance: 0.00'}
            icon={<FaEthereum />}
            isNotLink
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
            isNotLink
            onClick={() => toast.warn('Wallet disconnected')}
          />
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
