import { Action } from 'easy-peasy';
import { IShimmerNFT } from '../../../components/ui/NFTCard/ShimmerNFTCard.types';

export interface IListedNFTSModel {
  shimmerListedNFTS: IShimmerNFT[];

  setShimmerListedNFTS: Action<IListedNFTSModel, IShimmerNFT[]>;
}
