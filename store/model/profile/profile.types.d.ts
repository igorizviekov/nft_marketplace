import { Action } from 'easy-peasy';
import { INFTLog } from '../../../components/BaseTable/TableBodies/ActivityBody/ActivityBody.types';
import { ICollection } from '../app/app.types';
import { ITraits } from '../../../components/ui/NFTCard/NFTCard.types';
import { Nft, OwnedNft } from 'alchemy-sdk';
import { IShimmerNFT } from '../../../components/ui/NFTCard/ShimmerNFTCard.types';

export interface IProfileModel {
  profile: IProfile;
  nftLogs: INFTLog[];
  ownedNfts: OwnedNft[];
  shimmerOwnedNfts: IShimmerNFT[];
  isOwnedNFTSLoading: boolean;
  collections: ICollection[];

  updateCollections: Action<IProfileModel, ICollection[]>;

  updateProfile: Action<IProfileModel, IProfile>;
  updateNFTLogs: Action<IProfileModel, INFTLog>;

  setOwnedNFTS: Action<IProfileModel, OwnedNft[]>;
  setShimmerOwnedNFTS: Action<IProfileModel, IShimmerNFT[]>;
  setIsOwnedNFTsLoading: Action<IProfileModel, boolean>;
}

export interface IProfile {
  image?: string;
  name?: string;
  email?: string;
  location?: string;
  website?: string;
  discord?: string;
  description?: string;
  twitter?: string;
  instagram?: string;
}

export interface INFTLog {
  id: string;
  image_uri: string;
  nft_id: string;
  transaction_type: string;
  seller_address: string;
  buyer_address: string;
  date: Date;
  token_value: number;
}
