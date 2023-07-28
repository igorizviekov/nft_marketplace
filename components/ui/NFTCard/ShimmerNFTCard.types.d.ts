import { ICollection } from '../../../store/model/app/app.types';
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
    collection?: ICollection;
  };
}
