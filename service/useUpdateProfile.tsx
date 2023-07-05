import axios from 'axios';
import { IProfile } from '../store/model/profile/profile.types';
import { useIPFSImageUpload } from './useIPFSImageUpload';

const useUpdateProfile = async (profile: IProfile, file: File | null) => {
  //@TODO replace id once the method on the api changed
  const id = localStorage.getItem('usersUID');
  const token = localStorage.getItem('token');

  const ipfsImagePath = file && (await useIPFSImageUpload(file));

  axios
    .patch(
      `https://nft-api-production-4aa1.up.railway.app/users/${id}`,
      {
        image: ipfsImagePath,
        name: profile.name,
        description: profile.description,
        email: profile.email,
        location: profile.location,
        website: profile.website,
        discord: profile.discord,
        twitter: profile.twitter,
        instagram: profile.instagram,
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
