import { action } from 'easy-peasy';
import { IFilterModel } from './filter.types';

export const FilterModel: IFilterModel = {
  filters: [],
  addFilter: action((state, payload) => {
    if (state.filters.length === 0) {
      state.filters.push(payload);
    } else {
      if (
        !state.filters.some(
          (filter) =>
            filter.trait_type === payload.trait_type &&
            filter.value === payload.value
        )
      ) {
        state.filters.push(payload);
      }
    }
  }),

  deleteFilter: action((state, payload) => {
    state.filters.map((filter, index) => {
      if (
        filter.value === payload.value &&
        filter.trait_type === filter.trait_type
      ) {
        state.filters.splice(index, 1);
      }
    });
  }),
  clearFilters: action((state) => {
    state.filters = [];
  }),
};
