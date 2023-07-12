import { Action } from 'easy-peasy';
import { OwnedNft } from 'alchemy-sdk';

export interface ISingleCollectionModel {
  collectionData: ISingleCollection | undefined;
  collectionNFTS: OwnedNft[] | undefined;
  isLoading: boolean;

  setCollectionNFTS: Action<ISingleCollectionModel, OwnedNft[]>;
  setCollectionData: Action<ISingleCollectionModel, ISingleCollection>;
  setIsLoading: Action<ISingleCollectionModel, boolean>;
}

export interface ISingleCollection {
  blockchain_id: string;
  categoryPrimary: string;
  categorySecondary: string;
  creator_id: string;
  description: string;
  image: string;
  name: string;
  royalties: number;
  symbol: string;
  website: string;
}
