import axios from 'axios';
import { useEffect } from 'react';
import { useStoreActions, useStoreState } from '../store';
import { useAuth } from './useAuth';

const useFetchProfile = () => {
  useAuth();
  const { activeWallet } = useStoreState((state) => state.wallet);

  const { updateProfile, updateNFTLogs, updateCollections } = useStoreActions(
    (actions) => actions.profile
  );
  useEffect(() => {
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('usersUID');
    axios
      .get(`${process.env.NEXT_PUBLIC_API_KEY}/users/${id}`)
      .then((response) => {
        updateProfile({
          ...response.data.data,
        });
      })
      .catch((error) => console.error(error));

    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_KEY}/collection/user/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        updateCollections(response.data.data);
      })
      .catch((error) => console.error(error));

    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_KEY}/wallets/user/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .catch((error) => console.log(error));

    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_KEY}/nft-logs/users/${activeWallet}`
      )
      .then((response) => {
        updateNFTLogs(response.data.data);
      });
  }, []);
};

export default useFetchProfile;
