import { action } from 'easy-peasy';
import { IBulkUploadModel } from './bulk-upload.types';

export const BulkUploadModel: IBulkUploadModel = {
  bulkInformation: {
    metadata: null,
    images: null,
    collection: null,
    price: 0,
  },

  formError: true,
  setFormError: action((state, payload) => {
    state.formError = payload;
  }),


  editBulkInformation: action((state, payload) => {
    state.bulkInformation = {
      metadata: payload.metadata,
      images: payload.images,
      collection: payload.collection,
      price: payload.price,
    };
  }),
};
