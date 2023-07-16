import { action } from 'easy-peasy';
import { INFTViewModel } from './nft-view.types';

export const NFTViewModel: INFTViewModel = {
  nft: undefined,

  setNFT: action((state, payload) => {
    state.nft = { ...payload };
  }),
  isListedLoading: true,
  setIsListedLoading: action((state, payload) => {
    state.isListedLoading = payload;
  }),
};
