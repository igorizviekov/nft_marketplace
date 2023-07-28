import axios from 'axios';
import { ConnectWallet } from '../utils';
import { useEffect, useState } from 'react';
import { useStoreState } from '../store';

export async function useAuth() {
  const [status, setStatus] = useState<number>();
  const { blockchains } = useStoreState((state) => state.app);
  const { isWalletConnected, activeWallet } = useStoreState(
    (state) => state.wallet
  );
  useEffect(() => {
    if (isWalletConnected) {
      axios
        .post('https://nft-api-production-4aa1.up.railway.app/users/signin', {
          wallet: activeWallet,
        })
        .then((response) => {
          localStorage.setItem('token', response.data.data.accessToken);
          localStorage.setItem('usersUID', response.data.data.usersUID);
        })
        .catch((error) => setStatus(error.response.status));
    }

    if (status === 401 && activeWallet) {
      axios
        .post('https://nft-api-production-4aa1.up.railway.app/users/signup', {
          wallet: activeWallet,
          blockchain_id: blockchains[0].id,
        })
        .then((response) => {
          setStatus(response.status);
        })
        .catch((error) => console.log(error));
    }

    if (!isWalletConnected) {
      localStorage.clear();
    }
  }, [isWalletConnected, status, activeWallet]);
}

export interface IAuthProps {
  mode: ConnectWallet;
}
