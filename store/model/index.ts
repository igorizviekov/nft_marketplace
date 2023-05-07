import { IStoreModel } from './model.types';
import { UIModel } from './ui';
import { UserModel } from './user';
import { WalletModel } from './wallet';
import { persist } from 'easy-peasy';
import { ProfileModel } from './profile';
import { FilterModel } from './filter';
import { CollectionsModel } from './collection';
import { NFTMintModel } from './nft-mint';
export const model: IStoreModel = {
  ui: UIModel,
  wallet: WalletModel,
  user: persist(UserModel),
  profile: ProfileModel,
  filter: FilterModel,
  collection: CollectionsModel,
  nftMint: NFTMintModel,
};
