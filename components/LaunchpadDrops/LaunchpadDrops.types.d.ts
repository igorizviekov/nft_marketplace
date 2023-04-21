export interface ILaunchpadDropsProps {
  image: string;
  network: Network;
  name: string;
  launchDate: Date;
}

export type Network = 'ETH' | 'MATIC' | 'SMR';
