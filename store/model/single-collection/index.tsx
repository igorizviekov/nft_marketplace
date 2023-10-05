import { action } from 'easy-peasy';
import { ISingleCollectionModel } from './single-collection.types';

export const SingleCollectionModel: ISingleCollectionModel = {
  collectionData: undefined,
  collectionNFTS: undefined,
  isLoading: false,

  setCollectionData: action((state, payload) => {
    state.collectionData = {
      ...payload,
    };
  }),

  setCollectionNFTS: action((state, payload) => {
    if (
      state.collectionNFTS?.length === 0 ||
      state.collectionNFTS === undefined
    ) {
      state.collectionNFTS = payload;
    }
  }),
  setIsLoading: action((state, payload) => {
    state.isLoading = payload;
  }),
};
