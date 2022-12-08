import { IStoreModel } from './model.types';
import { UIModel } from './ui';
import { WalletModel } from './wallet';

export const model: IStoreModel = {
  ui: UIModel,
  wallet: WalletModel,
};
