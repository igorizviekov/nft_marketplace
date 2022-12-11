import { action, thunk } from 'easy-peasy';
import { IWalletModel } from './wallet.types';
import { create as ipfsClient } from 'ipfs-http-client';

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
