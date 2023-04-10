import { IStoreModel } from './model.types';
import { UIModel } from './ui';
import { UserModel } from './user';
import { WalletModel } from './wallet';
import { persist } from 'easy-peasy';
import { ProfileModel } from './profile';

export const model: IStoreModel = {
  ui: UIModel,
  wallet: WalletModel,
  user: persist(UserModel),
  profile: ProfileModel,
};
