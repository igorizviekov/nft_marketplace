import { action } from 'easy-peasy';
import { IAppModel } from './app.types';

export const AppModel: IAppModel = {
  blockchains: [],

  setBlockchains: action((state, payload) => {
    const duplicated = state.blockchains.some(
      (blockchain) => blockchain.id === payload.id
    );
    if (!duplicated) {
      state.blockchains.push(payload);
    }
  }),
};
