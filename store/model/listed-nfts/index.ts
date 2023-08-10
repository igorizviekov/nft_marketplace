import { action } from 'easy-peasy';
import { IListedNFTSModel } from './listed-nfts.types';

export const ListedNFTSModel: IListedNFTSModel = {
  shimmerListedNFTS: [],
  setShimmerListedNFTS: action((state, payload) => {
    if (state.shimmerListedNFTS.length === 0) {
      state.shimmerListedNFTS = payload;
    }

    payload.forEach((nft) => {
      const isDuplicated = state.shimmerListedNFTS.some(
        (shimmerNFT) => shimmerNFT.id === nft.id
      );

      if (!isDuplicated) state.shimmerListedNFTS.push(nft);
    });
  }),
};
