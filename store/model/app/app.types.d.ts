import { Action } from 'easy-peasy';

export interface IAppModel {
  blockchains: IBlockchain[];
  isLoading: boolean;

  setBlockchains: Action<IAppModel, IBlockchain>;
  setIsLoading: Action<IAppModel, boolean>;
}

export interface IBlockchain {
  id: string;
  chain_id: number | null;
  currency_symbol: string;
  rpc_url: string;
}
