import { IStoreModel } from './model.types';
import { UserModel } from './user';
import { WalletModel } from './wallet';
import { persist } from 'easy-peasy';
import { ProfileModel } from './profile';
import { FilterModel } from './filter';
import { CreateCollectionModel } from './create-collection';
import { NFTMintModel } from './nft-mint';
import { BulkUploadModel } from './bulk-upload';
import { AppModel } from './app';
import { SingleCollectionModel } from './single-collection';
export const model: IStoreModel = {
  app: AppModel,
  wallet: WalletModel,
  user: persist(UserModel),
  profile: ProfileModel,
  filter: FilterModel,
  createCollection: CreateCollectionModel,
  nftMint: NFTMintModel,
  bulkUpload: BulkUploadModel,
  singleCollection: SingleCollectionModel,
};
