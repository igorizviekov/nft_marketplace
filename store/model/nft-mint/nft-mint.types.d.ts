import { Royalty } from '../collection/collection.types';
import { Action } from 'easy-peasy';
export interface INFTMintModel {
  nftGeneralInfo: INFTGeneralInfo;
  royalties: Royalty[];

  editGeneralInformation: Action<INFTMintModel, INFTGeneralInfo>;
  addRoyalty: Action<INFTMintModel, Royalty>;
  deleteRoyalty: Action<INFTMintModel, Royalty>;
}

export interface INFTGeneralInfo {
  image: file | null;
  name: string;
  description: string;
  price: number;
  collection?: string;
}
