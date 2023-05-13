import { Action } from 'easy-peasy';

export interface IBulkUploadModel {
  bulkInformation: IBulkInformation;
  formError: boolean;

  editBulkInformation: Action<IBulkUploadModel, IBulkInformation>;
  setFormError: Action<IBulkUploadModel, boolean>;
}

export interface IBulkInformation {
  metadata: File | null;
  images: File | null;
  collection: string | null;
  price: number;
}
