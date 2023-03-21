import { Actions, useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect, useState } from 'react';
import { IStoreModel } from '../../store/model/model.types';
import { useGoogleLogin, googleLogout } from '@react-oauth/google';
import { Button } from '../ui/Button';
import axios from 'axios';
import { toast } from 'react-toastify';
import Image from 'next/image';

export const UserLogin = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const userState = useStoreState((state: IStoreModel) => state.user);
  const userActions = useStoreActions(
    (actions: Actions<IStoreModel>) => actions.user
  );

  const handleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const autHeader = `${tokenResponse.token_type} ${tokenResponse.access_token}`;
      try {
        const res = await axios.get(
          'https://people.googleapis.com/v1/people/me?personFields=names,photos',
          {
            headers: {
              Authorization: autHeader,
            },
          }
        );
        const {
          data: { names, photos },
        } = res;
        userActions.setUser({
          name: names?.[0]?.unstructuredName?.replace(/ /g, '_')?.toLowerCase(),
          avatar: photos?.[0]?.url,
        });
        setLoggedIn(true);
      } catch {
        toast.error('Login error. Please try again');
      }
    },
  });

  const handleLogOut = () => {
    userActions.clearUser();
    googleLogout();
    setLoggedIn(false);
    toast.info('You have successfully logged out');
  };

  useEffect(() => {
    if (userState.name.length > 1) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <div className="flex gap-5 sm:flex-col items-center">
      <Button
        isPrimary
        label={isLoggedIn ? 'Log Out' : 'Sign In with Google'}
        onClick={isLoggedIn ? handleLogOut : handleLogin}
      />
      {isLoggedIn && userState.avatar && (
        <div
          className="flex h-[32px] w-[32px] sm:h-[50px] sm:w-[50px]"
          style={{
            position: 'relative',
          }}
        >
          <Image
            src={userState.avatar}
            alt="profile photo"
            fill
            style={{
              objectFit: 'cover',
              borderRadius: '50%',
            }}
          />
        </div>
      )}
    </div>
  );
};
