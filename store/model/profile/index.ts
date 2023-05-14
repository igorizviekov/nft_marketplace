import { action } from 'easy-peasy';
import { IProfileModel } from './profile.types';

export const ProfileModel: IProfileModel = {
  profile: {
    // image: '',
    name: '',
    // description: '',
    email: '',
    location: '',
    website: '',
    discord: '',
    // twitter: '',
    // instagram: '',
  },
  updateProfile: action((state, payload) => {
    if (payload.name) state.profile.name = payload.name;
    if (payload.email) state.profile.email = payload.email;
    if (payload.location) state.profile.location = payload.location;
    if (payload.website) state.profile.website = payload.website;
    if (payload.discord) state.profile.discord = payload.discord;
    // if (payload.description) state.profile.description = payload.description;
    // if (payload.image) state.profile.image = payload.image;
    // if (payload.twitter) state.profile.twitter = payload.twitter;
    // if (payload.instagram) state.profile.instagram = payload.instagram;
  }),
};
