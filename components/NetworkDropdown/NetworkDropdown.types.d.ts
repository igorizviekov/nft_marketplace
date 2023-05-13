import { IBlockchain } from '../../store/model/app/app.types';

export interface INetworkProps {
  networks: IBlockchain[];
}

export type INetwork = 'ETH' | 'POLYGON' | 'SMR';
