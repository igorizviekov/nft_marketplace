import { Action } from 'easy-peasy';
import { OwnedNft } from 'alchemy-sdk';
import { ICollection } from '../app/app.types';

export interface ISingleCollectionModel {
  collectionData: ICollection | undefined;
  collectionNFTS: OwnedNft[] | undefined;
  isLoading: boolean;

  setCollectionNFTS: Action<ISingleCollectionModel, OwnedNft[]>;
  setCollectionData: Action<ISingleCollectionModel, ICollection>;
  setIsLoading: Action<ISingleCollectionModel, boolean>;
}
