import { Action } from 'easy-peasy';
import { INFTCategories } from '../../../components/Filter/Filter.types';

export interface IFilterModel {
  filters: string[];

  addFilter: Action<IFilterModel, string>;
  deleteFilter: Action<IFilterModel, string>;
  clearFilters: Action<IFilterModel>;
}
