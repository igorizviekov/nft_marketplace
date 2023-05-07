import { Action } from 'easy-peasy';
export interface ICollectionModel {
  generalInformation: GeneralInformation;
  generalInformationFormError: boolean;

  royalties: Royalty[];

  addRoyalty: Action<ICollectionModel, Royalty>;
  deleteRoyalty: Action<ICollectionModel, Royalty>;

  editGeneralInformation: Action<ICollectionModel, GeneralInformation>;
  setGeneralInformationFormError: Action<ICollectionModel, boolean>;
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
