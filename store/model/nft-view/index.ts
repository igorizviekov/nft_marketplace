import { action } from 'easy-peasy';
import { INFTViewModel } from './nft-view.types';

export const NFTViewModel: INFTViewModel = {
  nft: undefined,

  setNFT: action((state, payload) => {
    state.nft = { ...payload };
  }),
};
