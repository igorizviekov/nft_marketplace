import { Nft, OwnedNft } from 'alchemy-sdk';

export interface INftCardProps {
  nft: INFT | undefined;
}
export interface ITraits {
  display_type: string;
  trait_type: string;
  value: string;
}

export interface INFT extends OwnedNft {
  name?: string;
  balance: number;
}
