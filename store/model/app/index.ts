import { action } from 'easy-peasy';
import { IAppModel } from './app.types';

export const AppModel: IAppModel = {
  selectedBlockchain: undefined,
  blockchains: [],
  isCollectionsLoading: false,
  collections: [],
  isLoading: true,

  setBlockchains: action((state, payload) => {
    const duplicated = state.blockchains.some(
      (blockchain) => blockchain.id === payload.id
    );
    if (!duplicated) {
      state.blockchains.push(payload);
    }
  }),

  setSelectedBlockchain: action((state, payload) => {
    const found = state.blockchains.find(
      (blockchain) => blockchain.id === payload.id
    );

    state.selectedBlockchain = found;
  }),

  setIsLoading: action((state, payload) => {
    state.isLoading = payload;
  }),

  setCollections: action((state, payload) => {
    const duplicated = state.collections.some(
      (collections) => collections.id === payload.id
    );
    if (!duplicated) {
      state.collections.push(payload);
    }
  }),
  setIsCollectionLoading: action((state, payload) => {
    state.isLoading = payload;
  }),
};
