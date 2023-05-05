import React from 'react';
import { IMultipleFilterProps } from './MultipleFilter.types';
import styles from './MultipleFilter.module.scss';
import { Accordion } from 'react-accordion-ts';
import 'react-accordion-ts/src/panel.css';
import Icon from '../ui/Icon/Icon';
import { BsChevronDown } from 'react-icons/bs';
import { useStoreActions, useStoreState } from '../../store';
import classNames from 'classnames';
import { ITraits } from '../ui/NFTCard/NFTCard';
export const MultipleFilter = ({ values }: IMultipleFilterProps) => {
  const addFilter = useStoreActions((actions) => actions.filter.addFilter);

  const filters = useStoreState((state) => state.filter.filters);

  const itemsTest = values?.traits.map((trait) => ({
    title: (
      <div className={styles.title}>
        <h3>{trait.trait_type}</h3>
        <Icon icon={<BsChevronDown />} />
      </div>
    ),
    content: (
      <>
        {trait.values.map((value, index) => {
          const selected = filters.some(
            (filter: ITraits) =>
              filter.value === value && filter.trait_type === trait.trait_type
          );
          return (
            <div
              key={index}
              className={classNames(styles.filter, selected && styles.selected)}
              onClick={() =>
                addFilter({ trait_type: trait.trait_type, value: value })
              }
            >
              <p>{value}</p>
            </div>
          );
        })}
      </>
    ),
  }));

  return (
    <>
      {itemsTest && (
        <Accordion items={itemsTest} duration={200} multiple={false} />
      )}
    </>
  );
};
