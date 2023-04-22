import { action } from 'easy-peasy';
import { IFilterModel } from './filter.types';

export const FilterModel: IFilterModel = {
  filters: [],
  addFilter: action((state, payload) => {
    if (state.filters.length === 0) {
      state.filters.push(payload);
    } else {
      if (!state.filters.includes(payload)) {
        state.filters.push(payload);
      }
    }
  }),

  deleteFilter: action((state, payload) => {
    state.filters.map((filter, index) => {
      if (filter === payload) {
        state.filters.splice(index, 1);
      }
    });
  }),
};
