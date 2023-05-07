import { Action } from 'easy-peasy';

export interface ICollectionModel {
  royalties: Royalty[];

  addRoyalty: Action<ICollectionModel, Royalty>;
  deleteRoyalty: Action<ICollectionModel, Royalty>;
}

export interface Royalty {
  walletAddress: string;
  percentage: number;
}
