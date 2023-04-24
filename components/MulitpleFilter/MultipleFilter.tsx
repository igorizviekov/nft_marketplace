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
export const MultipleFilter = ({}: IMultipleFilterProps) => {
  const addFilter = useStoreActions((actions) => actions.filter.addFilter);

  const items = FilterMock.map(({ content, title }) => ({
    title: (
      <div className={styles.title}>
        <h3>{title}</h3>
        <Icon icon={<BsChevronDown />} />
      </div>
    ),
    content: (
      <>
        {content.map((item, index) => (
          <div
            key={index}
            className={styles.filter}
            onClick={() => addFilter(item)}
          >
            <p>{item}</p>
          </div>
        ))}
      </>
    ),
  }));

  return (
    <>
      <Accordion  items={items} duration={200} multiple={false} />
    </>
  );
};
