import { IUiModel } from './ui/ui.types';
import { Action } from 'easy-peasy';
import { IWalletModel } from './wallet/wallet.types';

export interface IStoreModel {
  ui: IUiModel;
  wallet: IWalletModel;
}
