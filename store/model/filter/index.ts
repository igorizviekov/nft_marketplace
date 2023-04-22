import { action } from 'easy-peasy';
import { IFilterModel } from './filter.types';

export const FilterModel: IFilterModel = {
  filter: [],
  addFilter: action((state, payload) => {
    state.filter.push(payload);
  }),
};
