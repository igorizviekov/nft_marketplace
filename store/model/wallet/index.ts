import { action } from 'easy-peasy';
import { IWalletModel } from './wallet.types';

export const WalletModel: IWalletModel = {
  currency: 'ETH',
  activeWallet: null,
  isWalletConnected: false,
  setIsWalletConnected: action((state, payload: boolean) => {
    state.isWalletConnected = payload;
  }),
  setActiveWallet: action((state, payload: any) => {
    state.activeWallet = payload;
  }),
};
