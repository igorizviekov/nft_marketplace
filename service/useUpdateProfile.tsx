import axios from 'axios';
import { IProfile } from '../store/model/profile/profile.types';

const useUpdateProfile = (profile: IProfile) => {
  const id = '5e48f78f-5311-41be-b4a8-5e4d2203d1c6';
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
