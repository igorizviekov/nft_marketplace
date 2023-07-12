export interface IShimmerNFTCardProps{
  nft: IShimmerNFT
}

export interface IShimmerNFT {
  name: string;
  uri: string;
  owner: string;
  metadata: {
    description: string;
    image: string;
    name: string;
    traits: [{ trait_type: string; value: string }];
    price: string;
    royalty?: number;
  };
}
