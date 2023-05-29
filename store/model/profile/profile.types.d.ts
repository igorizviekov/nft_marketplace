import { Action } from 'easy-peasy';
import { INFTLog } from '../../../components/BaseTable/TableBodies/ActivityBody/ActivityBody.types';
import { ICollection } from '../app/app.types';

export interface IProfileModel {
  profile: IProfile;
  nftLogs: INFTLog[];
  collections: ICollection[];

  updateCollections: Action<IProfileModel, ICollection[]>;
  
  updateProfile: Action<IProfileModel, IProfile>;
  updateNFTLogs: Action<IProfileModel, INFTLog>;
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
