import { Action } from 'easy-peasy';
import { INFTCategories } from '../../../components/Filter/Filter.types';
import { ICollectionTrait } from '../../../mocks/SingleCollectionPage.mock';
import { ITraits } from '../../../components/ui/NFTCard/NFTCard';

export interface IFilterModel {
  filters: ITraits[];

  addFilter: Action<IFilterModel, ITraits>;
  deleteFilter: Action<IFilterModel, ITraits>;
  clearFilters: Action<IFilterModel>;
}
