import { INftCardProps } from '../../../components/ui/NFTCard/NFTCard.types';
import { Action } from 'easy-peasy';
import { INFT } from '../profile/profile.types';
export interface INFTViewModel {
  nft: INFT | undefined;

  setNFT: Action<INFTViewModel, INFT>;
}
