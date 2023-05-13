import { Action } from 'easy-peasy';

export interface IAppModel {
  blockchains: IBlockchain[];

  setBlockchains: Action<IAppModel, IBlockchain>;
}

export interface IBlockchain {
  id: string;
  chain_id: number | null;
  currency_symbol: string;
  rpc_url: string;
}
