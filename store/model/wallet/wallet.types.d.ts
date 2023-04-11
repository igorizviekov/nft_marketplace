import { Action } from 'easy-peasy';

export interface IWalletModel {
  activeWallet: any;
  currency: string;
  isWalletConnected: boolean;
  setIsWalletConnected: Action<IWalletModel, boolean>;
  setActiveWallet: Action<IWalletModel, any>;
  setCurrency: Action<IWalletModel, string>;
}
