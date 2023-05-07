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
