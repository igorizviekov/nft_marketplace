import { IBlockchain } from '../../store/model/app/app.types';

export interface INetworkProps {
  networks: IBlockchain[];
  isLoading: boolean;
}

export type INetwork = 'ETH' | 'POLYGON' | 'SMR';
