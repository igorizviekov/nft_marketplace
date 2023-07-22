import axios from 'axios';
import { ICollection } from '../store/model/app/app.types';
import { useEffect } from 'react';

const useUpdateUserCollections = (
  updateCollections: (collections: ICollection[]) => void,
  isModalOpen?: boolean
) => {
  const token = localStorage.getItem('token');
  const id = localStorage.getItem('usersUID');

  useEffect(() => {
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
  }, [isModalOpen]);
};

export default useUpdateUserCollections;
