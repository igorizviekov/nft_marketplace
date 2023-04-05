import { Actions, useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect, useState } from 'react';
import { IStoreModel } from '../../store/model/model.types';
import { Button } from '../ui/Button';
import axios from 'axios';
import { toast } from 'react-toastify';
import Image from 'next/image';

export const UserLogin = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const walletState = useStoreState((state: IStoreModel) => state.wallet);
  const userState = useStoreState((state: IStoreModel) => state.user);
  const userActions = useStoreActions(
    (actions: Actions<IStoreModel>) => actions.user
  );

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACK_API}/users/signin`,
        {
          wallet: walletState.activeWallet,
        }
      );
      const {
        data: { status, data },
      } = res;
      if (status === 'success' && data.accessToken) {
        setLoggedIn(true);
        userActions.setToken(data.accessToken);
      }
    } catch (e) {
      console.log({ e });
      toast.error('Unable to login. Please connect a wallet');
    }
  };

  const handleLogOut = () => {
    userActions.clearUser();
    setLoggedIn(false);
    toast.info('You have successfully logged out');
  };

  useEffect(() => {
    if (userState.token) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <div className="flex gap-5 sm:flex-col items-center">
      <Button
        isPrimary
        label={isLoggedIn ? 'Log Out' : 'Sign In'}
        onClick={isLoggedIn ? handleLogOut : handleLogin}
      />
    </div>
  );
};
