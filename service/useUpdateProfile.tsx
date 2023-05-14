import axios from 'axios';
import { IProfile } from '../store/model/profile/profile.types';

const useUpdateProfile = (profile: IProfile) => {
  const id = '5200482a-b9b4-42ff-9161-28c1f510ebbb';
  const token = localStorage.getItem('token');
  console.log(profile)
  axios
    .patch(
      `https://nft-api-production-3c8d.up.railway.app/users/${id}`,
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
