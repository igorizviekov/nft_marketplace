import { Trait } from '../../../store/model/nft-mint/nft-mint.types';

export interface IShimmerNFTCardProps {
  nft: IShimmerNFT;
}

export interface IShimmerNFT {
  id: number;
  name: string;
  uri: string | undefined;
  owner: string;
  metadata: {
    description: string;
    image: string | undeifned;
    name: string;
    traits: Trait[];
    price: string;
    royalty?: number;
  };
  collection?: {
    id: number;
    metadata: {
      category_primary: string;
      category_secondary: string;
      description: string;
      name: string;
      symbol: string;
      website: string;
    };
    owner: string;
  };
}
