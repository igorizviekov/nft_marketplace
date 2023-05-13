import { Action } from 'easy-peasy';

export interface ISingleCollectionModel {
  collectionData: ISingleCollection | undefined;
  isLoading: boolean;

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
