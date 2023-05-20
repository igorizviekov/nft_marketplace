import { action } from 'easy-peasy';
import { INFTLog, IProfileModel } from './profile.types';

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
  nftLogs: [],

  updateProfile: action((state, payload) => {
    state.profile = { ...payload };
  }),
  updateNFTLogs: action((state, payload) => {
    payload.map((log: INFTLog) => {
      const isDuplicated = state.nftLogs.some((nft) => nft.id === log.id);

      if (!isDuplicated)
        state.nftLogs.push({
          ...log,
          date: new Date(log.date),
        });
    });
  }),
};
