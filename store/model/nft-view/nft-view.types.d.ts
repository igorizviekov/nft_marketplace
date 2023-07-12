import { INftCardProps } from '../../../components/ui/NFTCard/NFTCard.types';
import { Action } from 'easy-peasy';
import { OwnedNft } from 'alchemy-sdk';
import { IShimmerNFT } from '../../../components/ui/NFTCard/ShimmerNFTCard.types';
export interface INFTViewModel {
  nft: OwnedNft | IShimmerNFT | undefined;

  setNFT: Action<INFTViewModel, OwnedNft | IShimmerNFT>;
}
