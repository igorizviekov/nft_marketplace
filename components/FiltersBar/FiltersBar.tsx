import React from 'react';
import { IFiltersBarProps } from './FiltersBar.types';
import styles from './FiltersBar.module.scss';
import { useStoreActions, useStoreState } from '../../store';
import { VscClose } from 'react-icons/vsc';
import Icon from '../ui/Icon/Icon';
const FiltersBar = ({}: IFiltersBarProps) => {
  const deleteFilter = useStoreActions(
    (actions) => actions.filter.deleteFilter
  );
  const clearFilters = useStoreActions(
    (actions) => actions.filter.clearFilters
  );
  const filters = useStoreState((state) => state.filter.filters);
  return (
    <>
      {filters.length > 0 && (
        <div className={styles.filters}>
          {filters.length > 0 && (
            <div
              className={styles.clearAll}
              onClick={() => clearFilters()}
            >
              {'Clear all'}
              <Icon icon={<VscClose />} />
            </div>
          )}
          {filters.map((filter, index) => (
            <div
              key={index}
              className={styles.selectedFilter}
              onClick={() =>
                deleteFilter({
                  trait_type: filter.trait_type,
                  value: filter.value,
                })
              }
            >
              {`${filter.trait_type}: ${filter.value}`}
              <Icon icon={<VscClose />} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default FiltersBar;
