import { action } from 'easy-peasy';
import { ICollectionModel } from './collection.types';

export const CollectionsModel: ICollectionModel = {
  royalties: [],

  addRoyalty: action((state, payload) => {
    state.royalties.push(payload);
  }),
  deleteRoyalty: action((state, payload) => {
    state.royalties.map((royalty, index) => {
      if (royalty.walletAddress === payload.walletAddress) {
        state.royalties.splice(index, 1);
      }
    });
  }),
};
