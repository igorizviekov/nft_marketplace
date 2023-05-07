import { IUiModel } from './ui/ui.types';
import { Action } from 'easy-peasy';
import { IWalletModel } from './wallet/wallet.types';
import { IUserModel } from './user/user.types';
import { IProfileModel } from './profile/profile.types';
import { IFilterModel } from './filter/filter.types';
import { ICollectionModel } from './collection/collection.types';
import { INFTMintModel } from './nft-mint/nft-mint.types';

export interface IStoreModel {
  ui: IUiModel;
  wallet: IWalletModel;
  user: IUserModel;
  profile: IProfileModel;
  filter: IFilterModel;
  collection: ICollectionModel;
  nftMint: INFTMintModel;
}
