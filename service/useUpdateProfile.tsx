import axios from 'axios';
import { IProfile } from '../store/model/profile/profile.types';
import { useIPFSImageUpload } from './useIPFSImageUpload';
import { getErrMessage } from './useMintNFT';
import { toast } from 'react-toastify';
import { NextRouter, useRouter } from 'next/router';

const useUpdateProfile = async (profile: IProfile, file: File | null, router: NextRouter) => {
  const id = localStorage.getItem('usersUID');
  const token = localStorage.getItem('token');


  const ipfsImagePath = file && (await useIPFSImageUpload(file));

  axios
    .patch(
      `https://nft-api-production-4aa1.up.railway.app/users/${id}`,
      {
        image: ipfsImagePath ? ipfsImagePath : profile.image,
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
      toast.success('Profile saved correctly');
      router.push('/profile');
    })
    .catch((error) => {
      const message = getErrMessage(error);
      console.log(message);
    });
};

export default useUpdateProfile;
