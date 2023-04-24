import React from 'react';
import { IMultipleFilterProps } from './MultipleFilter.types';
import styles from './MultipleFilter.module.scss';
import { Accordion } from 'react-accordion-ts';
import 'react-accordion-ts/src/panel.css';
import Icon from '../ui/Icon/Icon';
import { BsChevronDown } from 'react-icons/bs';
import { FilterMock } from '../../mocks/MultipleFilter.mock';
import { useStoreActions, useStoreState } from '../../store';
import { VscClose } from 'react-icons/vsc';
import classNames from 'classnames';
export const MultipleFilter = ({}: IMultipleFilterProps) => {
  const addFilter = useStoreActions((actions) => actions.filter.addFilter);

  const filters = useStoreState((state) => state.filter.filters);
  const items = FilterMock.map(({ content, title }) => ({
    title: (
      <div className={styles.title}>
        <h3>{title}</h3>
        <Icon icon={<BsChevronDown />} />
      </div>
    ),
    content: (
      <>
        {content.map((item, index) => {
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
    <>
      <Accordion items={items} duration={200} multiple={false} />
    </>
  );
};
