import { action } from 'easy-peasy';
import { INFTMintModel } from './nft-mint.types';

export const NFTMintModel: INFTMintModel = {
  nftGeneralInfo: {
    image: null,
    name: '',
    description: '',
    price: 0,
    collection: '',
  },

  isLoading: false,
  formError: true,

  royalties: [],
  royaltiesError: true,

  traits: [],
  traitsError: true,

  editGeneralInformation: action((state, payload) => {
    state.nftGeneralInfo = {
      image: payload.image,
      name: payload.name,
      description: payload.description,
      price: payload.price,
      collection: payload.collection,
    };
  }),

  addRoyalty: action((state, payload) => {
    state.royalties?.push(payload);
  }),
  deleteRoyalty: action((state, payload) => {
    state.royalties?.map((royalty, index) => {
      if (royalty.walletAddress === payload.walletAddress) {
        state.royalties?.splice(index, 1);
      }
    });
  }),
  setRoyaltiesError: action((state, payload) => {
    state.royaltiesError = payload;
  }),

  addTrait: action((state, payload) => {
    state.traits?.push(payload);
  }),
  deleteTrait: action((state, payload) => {
    state.traits?.map((trait, index) => {
      if (
        trait.trait_type === payload.trait_type &&
        trait.value === payload.value
      ) {
        state.traits?.splice(index, 1);
      }
    });
  }),

  resetTraits: action((state) => {
    state.traits = [];
  }),
  setTraitsError: action((state, payload) => {
    state.traitsError = payload;
  }),
  setFormError: action((state, payload) => {
    state.formError = payload;
  }),
  setIsLoading: action((state, payload) => {
    state.isLoading = payload;
  }),
};
