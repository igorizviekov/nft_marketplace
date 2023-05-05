import { Action } from 'easy-peasy';
import { INFTCategories } from '../../../components/Filter/Filter.types';
import { ICollectionTrait } from '../../../mocks/SingleCollectionPage.mock';

export interface IFilterModel {
  filters: IFilterTrait[];

  addFilter: Action<IFilterModel, IFilterTrait>;
  deleteFilter: Action<IFilterModel, IFilterTrait>;
  clearFilters: Action<IFilterModel>;
}

export interface IFilterTrait {
  trait_type: string;
  value: string;
}
