import axios from 'axios';
import { IProfile } from '../store/model/profile/profile.types';
import { useIPFSImageUpload } from './useIPFSImageUpload';
import { getErrMessage } from './useMintNFT';
import { toast } from 'react-toastify';
import { NextRouter, useRouter } from 'next/router';
import { useEffect } from 'react';

const useUpdateProfile = async (
  profile: IProfile,
  file: File | null,
  router: NextRouter
) => {
  const ipfsImagePath = file && (await useIPFSImageUpload(file));

  const id = localStorage.getItem('usersUID');
  const token = localStorage.getItem('token');
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
