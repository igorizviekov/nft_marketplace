import { Action } from 'easy-peasy';
import { INetwork } from '../../../components/NetworkDropdown/NetworkDropdown.types';
import { INFTCategories } from '../../../components/Filter/Filter.types';
import { IBlockchain } from '../app/app.types';
export interface ICreateCollectionModel {
  isCreatingCollection: boolean;
  isCollectionCreated: Action<ICreateCollectionModel, boolean>;

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
  network: IBlockchain;
  categoryPrimary: INFTCategories;
  categorySecondary: INFTCategories;
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
