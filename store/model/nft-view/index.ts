import { action } from 'easy-peasy';
import { INFTViewModel } from './nft-view.types';

export const NFTViewModel: INFTViewModel = {
  nft: {
    name: '',
    seller: '',
    owner: '',
    description: '',
    img: '',
    price: 0,
    tokenId: '',
    traits: [],
  },
  setNFT: action((state, payload) => {
    state.nft = { ...payload };
  }),
};
