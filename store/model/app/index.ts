import { action } from 'easy-peasy';
import { IAppModel } from './app.types';

export const AppModel: IAppModel = {
  blockchains: [],
  isLoading: true,

  setBlockchains: action((state, payload) => {
    const duplicated = state.blockchains.some(
      (blockchain) => blockchain.id === payload.id
    );
    if (!duplicated) {
      state.blockchains.push(payload);
    }
  }),

  setIsLoading: action((state, payload) => {
    state.isLoading = payload;
  }),
};
