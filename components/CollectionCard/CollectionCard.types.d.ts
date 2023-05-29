import { INFTCategories } from '../Filter/Filter.types';

export interface ILaunchpadDropsProps {
  image: string;
  network: string;
  name: string;
  isCategory: boolean;
  primaryCategory: INFTCategories;
  secondaryCategory: INFTCategories;
  launchDate?: Date;
}

export type Network = 'ETH' | 'MATIC' | 'SMR';
