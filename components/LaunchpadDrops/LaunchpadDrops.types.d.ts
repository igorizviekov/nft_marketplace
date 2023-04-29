import { INFTCategories } from '../Filter/Filter.types';

export interface ILaunchpadDropsProps {
  image: string;
  network: Network;
  name: string;
  launchDate: Date;
  isCategory: boolean;
  category: INFTCategories;
}

export type Network = 'ETH' | 'MATIC' | 'SMR';
