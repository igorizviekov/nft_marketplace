import { Action } from 'easy-peasy';
import { INFTLog } from '../../../components/BaseTable/TableBodies/ActivityBody/ActivityBody.types';
import { ICollection } from '../app/app.types';
import { ITraits } from '../../../components/ui/NFTCard/NFTCard.types';

export interface IProfileModel {
  profile: IProfile;
  nftLogs: INFTLog[];
  ownedNfts: INFT[];
  collections: ICollection[];

  updateCollections: Action<IProfileModel, ICollection[]>;

  updateProfile: Action<IProfileModel, IProfile>;
  updateNFTLogs: Action<IProfileModel, INFTLog>;

  setOwnedNFTS: Action<IProfileModel, INFT[]>;
}

export interface IProfile {
  name?: string;
  email?: string;
  location?: string;
  website?: string;
  discord?: string;
  // description?: string;
  // image?: string;
  // twitter?: string;
  // instagram?: string;
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
export interface INFT {
  title: string;
  description: string;
  metadata: {
    attributes: ITraits[];
  };
  timeLastUpdated: string;
  contract: {
    address: string;
  };
  contractMetadata: {
    openSea: {
      collectionName: string;
      description: string;
      floorPrice: number;
      imageUrl: string;
    };
    tokenType: string;
  };
  id: { tokenId: string; tokenMetadata: { tokenType: string } };
  royalty?: string;
  owner?: string;
}
