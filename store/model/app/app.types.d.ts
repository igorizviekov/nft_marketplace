import { Action } from 'easy-peasy';

export interface IAppModel {
  selectedBlockchain: IBlockchain | undefined;
  blockchains: IBlockchain[];
  isLoading: boolean;
  collections: ICollection[];
  isCollectionsLoading: boolean;

  setSelectedBlockchain: Action<IAppModel, IBlockchain>;
  setBlockchains: Action<IAppModel, IBlockchain>;
  setCollections: Action<IAppModel, ICollection>;
  setIsLoading: Action<IAppModel, boolean>;
  setIsCollectionLoading: Action<IAppModel, boolean>;
}

export interface IBlockchain {
  id: string;
  blockchain_id: number | null;
  currency_symbol: string;
  rpc_url: string;
}

export interface ICollection {
  id: string;
  name: string;
  creator_id: string;
  symbol: string;
  categoryPrimary: string;
  categorySecondary: string;
  blockchain_id: string;
  contract_address: string;
  owner: string;
  description: string;
  tokenId: number;
  image: string;
  website: string;
  royalties: number;
}
