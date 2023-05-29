import { action } from 'easy-peasy';
import { ICreateCollectionModel } from './collection.types';

export const CreateCollectionModel: ICreateCollectionModel = {
  royalties: [],
  generalInformation: {
    file: null,
    name: '',
    description: '',
    website: '',
  },
  networkInformation: {
    symbol: '',
    network: {
      currency_symbol: '',
      id: '',
      chain_id: 0,
      rpc_url: '',
    },
    categoryPrimary: 'Art',
    categorySecondary: 'Art',
  },
  gralInfoFormError: true,
  networkInformationError: true,
  royaltiesError: false,

  isCreatingCollection: false,
  isCollectionCreated: action((state, payload) => {
    state.isCreatingCollection = payload;
  }),
  /**
   * Royalties Actions
   */
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
  setRoyaltiesError: action((state, payload) => {
    state.royaltiesError = payload;
  }),

  /**
   * General information Actions
   */
  editGeneralInformation: action((state, payload) => {
    state.generalInformation = {
      file: payload.file,
      name: payload.name,
      description: payload.description,
      website: payload.website,
    };
  }),
  setGralInfoFormError: action((state, payload) => {
    state.gralInfoFormError = payload;
  }),

  /**
   * Network information Actions
   */

  setNetworkInformation: action((state, payload) => {
    state.networkInformation = {
      symbol: payload.symbol,
      network: payload.network,
      categoryPrimary: payload.categoryPrimary,
      categorySecondary: payload.categorySecondary,
    };
  }),
  setNetworkInformationError: action((state, payload) => {
    state.networkInformationError = payload;
  }),
};
