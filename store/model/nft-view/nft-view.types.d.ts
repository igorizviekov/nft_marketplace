import { INftCardProps } from '../../../components/ui/NFTCard/NFTCard.types';
import { Action } from 'easy-peasy';
export interface INFTViewModel {
  nft: INftCardProps;

  setNFT: Action<INFTViewModel, INftCardProps>;
}
