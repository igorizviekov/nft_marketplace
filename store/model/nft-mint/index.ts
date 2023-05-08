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
  royalties: [],
  traits: [],

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
  addTrait: action((state, payload) => {
    state.traits?.push(payload);
  }),
  deleteTrait: action((state, payload) => {
    state.traits?.map((trait, index) => {
      if (
        trait.traitType === payload.traitType &&
        trait.value === payload.value
      ) {
        state.traits?.splice(index, 1);
      }
    });
  }),
};
