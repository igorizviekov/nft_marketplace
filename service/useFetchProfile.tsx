import axios from 'axios';
import React, { useEffect } from 'react';
import { useStoreActions, useStoreState } from '../store';
import { useAuth } from './useAuth';

const useFetchProfile = () => {
  useAuth();
  const id = '5e48f78f-5311-41be-b4a8-5e4d2203d1c6';
  const wallet = '0xA3de3788307a25F76815EddE4776e7C1d25A3684';
  const { updateProfile, updateNFTLogs } = useStoreActions(
    (actions) => actions.profile
  );

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios
      .get(`https://nft-api-production-3c8d.up.railway.app/users/${id}`)
      .then((response) => {
        updateProfile({ ...response.data.data });
      })
      .catch((error) => console.error(error));

    axios
      .get(
        `https://nft-api-production-3c8d.up.railway.app/wallets/user/${id}`,
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
        `https://nft-api-production-3c8d.up.railway.app/nft-logs/users/${wallet}`
      )
      .then((response) => {
        updateNFTLogs(response.data.data);
      });
  }, [id]);
};

export default useFetchProfile;
