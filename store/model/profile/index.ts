import { action } from 'easy-peasy';
import { IProfileModel } from './profile.types';

export const ProfileModel: IProfileModel = {
  profile: {
    avatar: '',
    username: '',
    description: '',
    email: '',
    location: '',
    website: '',
    discord: '',
    twitter: '',
    instagram: '',
  },
  updateProfile: action((state, payload) => {
    if (payload.avatar) state.profile.avatar = payload.avatar;
    if (payload.username) state.profile.username = payload.username;
    if (payload.description) state.profile.username = payload.username;
    if (payload.email) state.profile.email = payload.email;
    if (payload.location) state.profile.location = payload.location;
    if (payload.website) state.profile.website = payload.website;
    if (payload.discord) state.profile.discord = payload.discord;
    if (payload.twitter) state.profile.twitter = payload.twitter;
    if (payload.instagram) state.profile.instagram = payload.instagram;
  }),
};
