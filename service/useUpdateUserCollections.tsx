import axios from 'axios';
import { ICollection } from '../store/model/app/app.types';
import { Dispatch, SetStateAction, useEffect } from 'react';

const useUpdateUserCollections = (
  updateCollections: (collections: ICollection[]) => void,
  setOptions?: Dispatch<SetStateAction<ICollection[]>>
) => {
  const token = localStorage.getItem('token');
  const id = localStorage.getItem('usersUID');
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
};

export default useUpdateUserCollections;
