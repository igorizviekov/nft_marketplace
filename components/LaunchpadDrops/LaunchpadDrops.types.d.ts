export interface ILaunchpadDropsProps {
  image: string;
  network: Network;
  name: string;
  launchDate: Date;
  isCategory: boolean;
}

export type Network = 'ETH' | 'MATIC' | 'SMR';
