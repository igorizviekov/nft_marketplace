import React from 'react';
import { IMultipleFilterProps } from './MultipleFilter.types';
import styles from './MultipleFilter.module.scss';
import { Accordion } from 'react-accordion-ts';
import 'react-accordion-ts/src/panel.css';
import Icon from '../ui/Icon/Icon';
import { BsChevronDown } from 'react-icons/bs';
import { useStoreActions, useStoreState } from '../../store';
import classNames from 'classnames';
export const MultipleFilter = ({ values }: IMultipleFilterProps) => {
  const addFilter = useStoreActions((actions) => actions.filter.addFilter);

  const filters = useStoreState((state) => state.filter.filters);
  const items = values?.traits.map(({ trait_type, values }) => ({
    title: (
      <div className={styles.title}>
        <h3>{trait_type}</h3>
        <Icon icon={<BsChevronDown />} />
      </div>
    ),
    content: (
      <>
        {values.map((item, index) => {
          const selected = filters.includes(item);
          return (
            <div
              key={index}
              className={classNames(styles.filter, selected && styles.selected)}
              onClick={() => addFilter(item)}
            >
              <p>{item}</p>
            </div>
          );
        })}
      </>
    ),
  }));

  return (
    <>{items && <Accordion items={items} duration={200} multiple={false} />}</>
  );
};
