import { Action } from 'easy-peasy';
import { INetwork } from '../../../components/NetworkDropdown/NetworkDropdown.types';
import { INFTCategories } from '../../../components/Filter/Filter.types';
export interface ICollectionModel {
  generalInformation: GeneralInformation;
  gralInfoFormError: boolean;

  networkInformation: NetworkInformation;
  networkInformationError: boolean;

  royalties: Royalty[];
  royaltiesError: boolean;

  addRoyalty: Action<ICollectionModel, Royalty>;
  deleteRoyalty: Action<ICollectionModel, Royalty>;
  setRoyaltiesError: Action<ICollectionModel, boolean>;

  editGeneralInformation: Action<ICollectionModel, GeneralInformation>;
  setGralInfoFormError: Action<ICollectionModel, boolean>;

  setNetworkInformation: Action<ICollectionModel, NetworkInformation>;
  setNetworkInformationError: Action<ICollectionModel, boolean>;
}

export interface NetworkInformation {
  symbol: string;
  network: INetwork;
  mainCategory: INFTCategories;
  subCategory: INFTCategories;
}
export interface Royalty {
  walletAddress: string;
  percentage: number | undefined;
}

export interface GeneralInformation {
  file: File | null;
  name: string;
  description: string;
  website?: string;
}
