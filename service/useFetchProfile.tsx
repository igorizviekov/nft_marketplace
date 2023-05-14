import axios from 'axios';
import React, { useEffect } from 'react';
import { useStoreActions } from '../store';

const useFetchProfile = () => {
  const id = '5200482a-b9b4-42ff-9161-28c1f510ebbb';
  const { updateProfile } = useStoreActions((actions) => actions.profile);
  useEffect(() => {
    axios
      .get(`https://nft-api-production-3c8d.up.railway.app/users/${id}`)
      .then((response) => {
        updateProfile({ ...response.data.data });
      })
      .catch((error) => console.error(error));
  }, [id]);
};

export default useFetchProfile;
