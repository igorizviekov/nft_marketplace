import { Action } from 'easy-peasy';
import { IWalletModel } from './wallet/wallet.types';
import { IUserModel } from './user/user.types';
import { IProfileModel } from './profile/profile.types';
import { IFilterModel } from './filter/filter.types';
import { ICollectionModel } from './create-collection/collection.types';
import { INFTMintModel } from './nft-mint/nft-mint.types';
import { IBulkUploadModel } from './bulk-upload/bulk-upload.types';
import { IAppModel } from './app/app.types';

export interface IStoreModel {
  app: IAppModel;
  wallet: IWalletModel;
  user: IUserModel;
  profile: IProfileModel;
  filter: IFilterModel;
  collection: ICollectionModel;
  nftMint: INFTMintModel;
  bulkUpload: IBulkUploadModel;
}
