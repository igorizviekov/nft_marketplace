export interface IShimmerNFTCardProps{
  nft: IShimmerNFT
}

export interface IShimmerNFT {
  name: string;
  uri: string;
  metadata: {
    description: string;
    image: string;
    name: string;
    attributes: [{ trait_type: string; value: string }];
    owner: string;
    price: string;
  };
}
