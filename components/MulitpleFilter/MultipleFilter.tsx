import React from 'react';
import { IMultipleFilterProps } from './MultipleFilter.types';
import styles from './MultipleFilter.module.scss';
import { Accordion, } from 'react-accordion-ts';
import 'react-accordion-ts/src/panel.css';
import Icon from '../ui/Icon/Icon';
import { BsChevronDown } from 'react-icons/bs';
export const MultipleFilter = ({}: IMultipleFilterProps) => {
  const news = [
    { title: 'Background', content: ['filter 1', 'filter 2'], open: true },
    { title: 'Clothes', content: ['filter 1', 'filter 2'], open: false },
    { title: 'Earrings', content: ['filter 1', 'filter 2', 'filter 3'] },
    { title: 'Eyes', content: ['filter 1', 'filter 2', 'filter 3'] },
    { title: 'Fur', content: ['filter 1', 'filter 2', 'filter 3', 'filter 4'] },
    {
      title: 'Hat',
      content: ['filter 1', 'filter 2', 'filter 3', 'filter 4', 'filter 5'],
    },
    { title: 'Mouth', content: ['filter 1', 'filter 2'] },
  ];

  const items = news.map(({ content, title }) => ({
    title: (
      <div className={styles.title}>
        <h3>{title}</h3>
        <Icon icon={<BsChevronDown />} />
      </div>
    ),
    content: (
      <>
        {content.map((item, index) => (
          <p key={index} className={styles.filter}>
            {item}
          </p>
        ))}
      </>
    ),
  }));

  return <Accordion items={items} duration={200} multiple={false} />;
};

