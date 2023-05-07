import { Royalty } from '../collection/collection.types';
import { Action } from 'easy-peasy';
export interface INFTMintModel {
  nftGeneralInfo: INFTGeneralInfo;
  royalties: Royalty[];
  traits: Trait[];

  editGeneralInformation: Action<INFTMintModel, INFTGeneralInfo>;

  addRoyalty: Action<INFTMintModel, Royalty>;
  deleteRoyalty: Action<INFTMintModel, Royalty>;

  addTrait: Action<INFTMintModel, Trait>;
  deleteTrait: Action<INFTMintModel, Trait>;
}

export interface INFTGeneralInfo {
  image: file | null;
  name: string;
  description: string;
  price: number;
  collection?: string;
}

export interface Trait {
  traitType: string;
  value: string;
}
