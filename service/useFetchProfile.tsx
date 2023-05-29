import axios from 'axios';
import React, { useEffect } from 'react';
import { useStoreActions, useStoreState } from '../store';
import { useAuth } from './useAuth';

const useFetchProfile = () => {
  useAuth();

  //@TODO replace id once the method on the api changed
  const id = 'ee1d1fce-5715-4b91-8668-b6adeb76659d';

  const { activeWallet } = useStoreState((state) => state.wallet);

  const { updateProfile, updateNFTLogs } = useStoreActions(
    (actions) => actions.profile
  );

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios
      .get(`https://nft-api-production-4aa1.up.railway.app/users/${id}`)
      .then((response) => {
        updateProfile({ ...response.data.data });
      })
      .catch((error) => console.error(error));

    axios
      .get(
        `https://nft-api-production-4aa1.up.railway.app/wallets/user/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => console.log(response, 'fetch profile'))
      .catch((error) => console.log(error));

    axios
      .get(
        `https://nft-api-production-4aa1.up.railway.app/nft-logs/users/${activeWallet}`
      )
      .then((response) => {
        updateNFTLogs(response.data.data);
      });
  }, [id]);
};

export default useFetchProfile;
