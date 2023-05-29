import axios from 'axios';
import { IProfile } from '../store/model/profile/profile.types';

const useUpdateProfile = (profile: IProfile) => {
  //@TODO replace id once the method on the api changed
  const id = 'ee1d1fce-5715-4b91-8668-b6adeb76659d';
  const token = localStorage.getItem('token');
  axios
    .patch(
      `https://nft-api-production-4aa1.up.railway.app/users/${id}`,
      {
        ...profile,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      console.log(response);
    })
    .catch((error) => console.error(error));
};

export default useUpdateProfile;
