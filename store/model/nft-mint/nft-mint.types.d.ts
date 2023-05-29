import { Royalty } from '../create-collection/collection.types';
import { Action, ActionOn } from 'easy-peasy';
export interface INFTMintModel {
  nftGeneralInfo: INFTGeneralInfo;
  formError: boolean;
  
  isLoading: boolean;
  setIsLoading: Action<INFTMintModel, boolean>;

  royalties: Royalty[];
  royaltiesError: boolean;

  traits: Trait[];
  traitsError: boolean;

  editGeneralInformation: Action<INFTMintModel, INFTGeneralInfo>;
  setFormError: Action<INFTMintModel, boolean>;

  addRoyalty: Action<INFTMintModel, Royalty>;
  deleteRoyalty: Action<INFTMintModel, Royalty>;
  setRoyaltiesError: Action<INFTMintModel, boolean>;

  addTrait: Action<INFTMintModel, Trait>;
  deleteTrait: Action<INFTMintModel, Trait>;
  setTraitsError: Action<INFTMintModel, boolean>;
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
