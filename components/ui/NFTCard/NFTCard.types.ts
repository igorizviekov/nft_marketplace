import { Nft, OwnedNft } from 'alchemy-sdk';

export interface INftCardProps {
  //@todo swap for ownedNFTs
  nft: INFT | undefined;
}
export interface ITraits {
  display_type: string;
  trait_type: string;
  value: string;
}

export interface INFT extends OwnedNft {
  name?: string;
  uri?: string;
  metadata?: {
    description: string;
    image: string;
    name: string;
    attributes: [{ trait_type: string; value: string }];
    owner: string;
    price: string;
  };
  balance: number;
}
