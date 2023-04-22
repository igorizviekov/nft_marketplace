import { Action } from 'easy-peasy';
import { INFTCategories } from '../../../components/Filter/Filter.types';

export interface IFilterModel {
  filter: INFTCategories[];

  addFilter: Action<IFilterModel , INFTCategories>;
}
