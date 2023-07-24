import axios from 'axios';
import React, { useEffect } from 'react';
import { useStoreActions, useStoreState } from '../store';
import { useAuth } from './useAuth';
import { local } from 'web3modal';
import useUpdateUserCollections from './useUpdateUserCollections';

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
      .get(`https://nft-api-production-4aa1.up.railway.app/users/${id}`)
      .then((response) => {
        updateProfile({
          ...response.data.data,
        });
      })
      .catch((error) => console.error(error));

    axios
      .get(
        `https://nft-api-production-4aa1.up.railway.app/collection/user/${id}`,
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
        `https://nft-api-production-4aa1.up.railway.app/wallets/user/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .catch((error) => console.log(error));

    axios
      .get(
        `https://nft-api-production-4aa1.up.railway.app/nft-logs/users/${activeWallet}`
      )
      .then((response) => {
        updateNFTLogs(response.data.data);
      });
  }, []);
};

export default useFetchProfile;
