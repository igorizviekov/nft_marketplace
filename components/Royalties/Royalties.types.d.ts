import { Action } from 'easy-peasy';
import {
  ICollectionModel,
  Royalty,
} from '../../store/model/collection/collection.types';

export interface IRoyaltiesProps {
  royalties: Royalty[];
  addRoyalty: (royalty: Royalty) => void;
  setFormError: (hasError: boolean) => void;
  royaltiesError: boolean;
}

export interface IRoyaltiesForm {
  walletAddress: string;
  percentage: string | undefined;
}

export interface IRoyaltiesListProps {
  royalties: Royalty[];
  deleteRoyalty: (royalty: Royalty) => void;
}
