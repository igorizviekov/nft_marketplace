import { Action } from 'easy-peasy';
import { INetwork } from '../../../components/NetworkDropdown/NetworkDropdown.types';
import { INFTCategories } from '../../../components/Filter/Filter.types';
export interface ICollectionModel {
  generalInformation: GeneralInformation;
  generalInformationFormError: boolean;

  networkInformation: NetworkInformation;
  networkInformationError: boolean;
  royalties: Royalty[];

  addRoyalty: Action<ICollectionModel, Royalty>;
  deleteRoyalty: Action<ICollectionModel, Royalty>;

  editGeneralInformation: Action<ICollectionModel, GeneralInformation>;
  setGeneralInformationFormError: Action<ICollectionModel, boolean>;

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
  percentage: number;
}

export interface GeneralInformation {
  file: File | null;
  name: string;
  description: string;
  website?: string;
}
