import { INetwork } from '../NetworkDropdown/NetworkDropdown.types';

export interface IAddCollectionModalProps {
  handleModalClose: () => void;
}

export type Steps = 'General' | 'Network' | 'Royalties';

export interface IGeneralInformationInput {
  file: File | null;
  name: string;
  description: string;
  website?: string;
}

export interface INetworkInformationInput {
  symbol: string;
  network: INetwork;
  mainCategory: 'Cat 1' | 'Cat 2' | 'Cat 3';
  subCategory: 'Cat 1' | 'Cat 2' | 'Cat 3';
}

export interface IModalSteps {
  handleSteps: () => void;
}
