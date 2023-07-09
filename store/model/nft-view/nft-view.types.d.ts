import { INftCardProps } from '../../../components/ui/NFTCard/NFTCard.types';
import { Action } from 'easy-peasy';
import { Nft } from 'alchemy-sdk';
export interface INFTViewModel {
  nft: Nft | undefined;

  setNFT: Action<INFTViewModel, Nft>;
}
