import { action } from 'easy-peasy';
import { ICollectionModel } from './collection.types';

export const CollectionsModel: ICollectionModel = {
  royalties: [],
  generalInformation: {
    file: null,
    name: '',
    description: '',
    website: ''
  },
  generalInformationFormError: true,

  addRoyalty: action((state, payload) => {
    state.royalties.push(payload);
  }),
  deleteRoyalty: action((state, payload) => {
    state.royalties.map((royalty, index) => {
      if (royalty.walletAddress === payload.walletAddress) {
        state.royalties.splice(index, 1);
      }
    });
  }),

  editGeneralInformation: action((state, payload) => {
    state.generalInformation = {
      file: payload.file,
      name: payload.name,
      description: payload.description,
      website: payload.website,
    };
  }),
  setGeneralInformationFormError: action((state, payload) => {
    state.generalInformationFormError = payload;
  }),
};
