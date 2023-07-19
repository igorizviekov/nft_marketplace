import { IStoreModel } from './model.types';
import { WalletModel } from './wallet';
import { ProfileModel } from './profile';
import { FilterModel } from './filter';
import { CreateCollectionModel } from './create-collection';
import { NFTMintModel } from './nft-mint';
import { BulkUploadModel } from './bulk-upload';
import { AppModel } from './app';
import { SingleCollectionModel } from './single-collection';
import { NFTViewModel } from './nft-view';
import { persist } from 'easy-peasy';
import { ListedNFTSModel } from './listed-nfts';
export const model: IStoreModel = {
  app: AppModel,
  wallet: persist(WalletModel),
  profile: persist(ProfileModel),
  filter: FilterModel,
  createCollection: CreateCollectionModel,
  nftMint: NFTMintModel,
  bulkUpload: BulkUploadModel,
  singleCollection: SingleCollectionModel,
  nftView: persist(NFTViewModel),
  listedNFTS: ListedNFTSModel,
};
