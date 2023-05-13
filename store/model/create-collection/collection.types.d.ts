import { Action } from 'easy-peasy';
import { INetwork } from '../../../components/NetworkDropdown/NetworkDropdown.types';
import { INFTCategories } from '../../../components/Filter/Filter.types';
export interface ICreateCollectionModel {
  generalInformation: GeneralInformation;
  gralInfoFormError: boolean;

  networkInformation: NetworkInformation;
  networkInformationError: boolean;

  royalties: Royalty[];
  royaltiesError: boolean;

  addRoyalty: Action<ICreateCollectionModel, Royalty>;
  deleteRoyalty: Action<ICreateCollectionModel, Royalty>;
  setRoyaltiesError: Action<ICreateCollectionModel, boolean>;

  editGeneralInformation: Action<ICreateCollectionModel, GeneralInformation>;
  setGralInfoFormError: Action<ICreateCollectionModel, boolean>;

  setNetworkInformation: Action<ICreateCollectionModel, NetworkInformation>;
  setNetworkInformationError: Action<ICreateCollectionModel, boolean>;
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
