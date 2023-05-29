import { Action } from 'easy-peasy';
import { IWalletModel } from './wallet/wallet.types';
import { IProfileModel } from './profile/profile.types';
import { IFilterModel } from './filter/filter.types';
import { ICreateCollectionModel } from './create-collection/collection.types';
import { INFTMintModel } from './nft-mint/nft-mint.types';
import { IBulkUploadModel } from './bulk-upload/bulk-upload.types';
import { IAppModel } from './app/app.types';
import { ISingleCollectionModel } from './single-collection/single-collection.types';

export interface IStoreModel {
  app: IAppModel;
  wallet: IWalletModel;
  profile: IProfileModel;
  filter: IFilterModel;
  createCollection: ICreateCollectionModel;
  nftMint: INFTMintModel;
  bulkUpload: IBulkUploadModel;
  singleCollection: ISingleCollectionModel;
}
