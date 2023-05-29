import { action } from 'easy-peasy';
import { ISingleCollectionModel } from './single-collection.types';

export const SingleCollectionModel: ISingleCollectionModel = {
  collectionData: undefined,
  isLoading: false,

  setCollectionData: action((state, payload) => {
    state.collectionData = {
      blockchain_id: payload.blockchain_id,
      categoryPrimary: payload.categoryPrimary,
      categorySecondary: payload.categorySecondary,
      creator_id: payload.creator_id,
      description: payload.description,
      name: payload.name,
      image: payload.image,
      royalties: payload.royalties,
      symbol: payload.symbol,
      website: payload.website,
    };
  }),

  setIsLoading: action((state, payload) => {
    state.isLoading = payload;
  }),
};
