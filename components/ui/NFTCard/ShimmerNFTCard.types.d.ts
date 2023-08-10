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
  /**
   * Price after token is listed
   */
  price: string;
  metadata: {
    description: string;
    image: string | undeifned;
    name: string;
    traits: Trait[];
    /**
     * Price inside metadata, doesn't reflect when token is listed
     */
    price: string;
    royalty?: number;
    tokenStandard?: string;
    collection?: {
      id: number;
      category_primary: string;
      category_secondary: string;
      description: string;
      name: string;
      symbol: string;
      website: string;
      owner: string;
      contract_address: string;
    };
  };
}
