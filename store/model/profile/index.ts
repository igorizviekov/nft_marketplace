import { action, useStoreActions } from 'easy-peasy';
import { INFTLog, IProfileModel } from './profile.types';

export const ProfileModel: IProfileModel = {
  profile: {
    image: '',
    name: '',
    description: '',
    email: '',
    location: '',
    website: '',
    discord: '',
    twitter: '',
    instagram: '',
  },
  collections: [],
  nftLogs: [],
  ownedNfts: [],
  shimmerOwnedNfts: [],
  isOwnedNFTSLoading: true,

  updateCollections: action((state, payload) => {
    state.collections = payload;
  }),
  updateProfile: action((state, payload) => {
    state.profile = { ...payload };
  }),
  updateNFTLogs: action((state, payload) => {
    payload.forEach((log: INFTLog) => {
      const isDuplicated = state.nftLogs.some((nft) => nft.id === log.id);

      if (!isDuplicated) {
        state.nftLogs.push({
          ...log,
        });
      }
    });
  }),
  setOwnedNFTS: action((state, payload) => {
    state.ownedNfts = payload;
  }),
  setIsOwnedNFTsLoading: action((state, payload) => {
    state.isOwnedNFTSLoading = payload;
  }),
  setShimmerOwnedNFTS: action((state, payload) => {
    if (state.shimmerOwnedNfts.length === 0) {
      state.shimmerOwnedNfts.push(...payload);
    } else {
      payload.forEach((nft) => {
        const isDuplicated = state.shimmerOwnedNfts.some(
          (shimmerNFT) => shimmerNFT.id === nft.id
        );
        if (!isDuplicated) {
          state.shimmerOwnedNfts.push(nft);
        }
      });
    }
  }),
  setShimmerOwnedNFTSCollections: action((state, payload) => {
    state.shimmerOwnedNfts[payload.index] = {
      ...state.shimmerOwnedNfts[payload.index],
      collection: payload.collection,
    };
  }),
};
