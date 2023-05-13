import { Action } from 'easy-peasy';

export interface IAppModel {
  blockchains: IBlockchain[];
  isLoading: boolean;
  collections: ICollection[];
  isCollectionsLoading: boolean;

  setBlockchains: Action<IAppModel, IBlockchain>;
  setCollections: Action<IAppModel, ICollection>;
  setIsLoading: Action<IAppModel, boolean>;
  setIsCollectionLoading: Action<IAppModel, boolean>;
}

export interface IBlockchain {
  id: string;
  chain_id: number | null;
  currency_symbol: string;
  rpc_url: string;
}

export interface ICollection {
  id: string;
  name: string;
  creator_id: string;
  categoryPrimary: string;
  categorySecondary: string;
  blockchain_id: string;
  contract_address: string;
  description: string;
  image: string;
  website: string;
  royalties: number;
}
