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

  const { isWalletConnected, activeWallet } = useStoreState(
    (state) => state.wallet
  );

  const walletStart = activeWallet && activeWallet.slice(0, 5);
  const walletEnds = activeWallet && activeWallet.slice(38, 42);

  //@TODO REPLACE WALLET STATE FOR STORE STATE WHEN MULTIPLE WALLETS ARE CONNECTED
  const [wallets, setWallets] = useState<string[]>([]);

  useOutsideAlerter(
    ref,
    () => setMenuOpen(!isMenuOpen),
    () => setMenuOpen(true)
  );

  return (
    <div className={styles.menu}>
      {isWalletConnected && (
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
            onClick={() => setMenuOpen(false)}
          />
          <DropdownMenuItem
            label={'Settings'}
            icon={<IoMdSettings />}
            href={'/edit'}
            onClick={() => setMenuOpen(false)}
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
            label={`Connect a different wallet${
              wallets.length > 0 ? "'s" : ''
            }`}
            icon={<TbRefresh />}
            href={'/connect-wallet'}
          />
          <DropdownMenuItem
            label={`Disconnect wallet${wallets.length > 0 ? "'s" : ''}`}
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
