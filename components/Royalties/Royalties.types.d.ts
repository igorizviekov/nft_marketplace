import { Action } from 'easy-peasy';
import {
  ICollectionModel,
  Royalty,
} from '../../store/model/collection/collection.types';

export interface IRoyaltiesProps {
  royalties: Royalty[];
  addRoyalty: (royalty: Royalty) => void;
}

export interface IRoyaltiesForm {
  walletAddress: string;
  percentage: string;
}

export interface IRoyaltiesListProps {
  royalties: Royalty[];
  deleteRoyalty: (royalty: Royalty) => void;
}