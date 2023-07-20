import { action } from 'easy-peasy';
import { IListedNFTSModel } from './listed-nfts.types';

export const ListedNFTSModel: IListedNFTSModel = {
  shimmerListedNFTS: [],
  setShimmerListedNFTS: action((state, payload) => {
    if (state.shimmerListedNFTS.length === 0) {
      state.shimmerListedNFTS = payload;
    }
  }),
};
