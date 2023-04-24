import React, { useEffect } from 'react';
import { IFilterProps } from './Filter.types';
import styles from './Filter.module.scss';
import Icon from '../ui/Icon/Icon';
import { FaFilter } from 'react-icons/fa';
import classNames from 'classnames';
const Filter = ({ options, selected, onSelect }: IFilterProps) => {
  function handleSelect(index: number) {
    if (selected !== index) {
      onSelect(index);
    } else {
      onSelect(null);
    }
  }
  return (
    <div className="flex-row-start">
      <Icon icon={<FaFilter />} className={styles.filter} />
      {options &&
        options.map((option, index) => (
          <div
            className={classNames(
              styles.option,
              selected === index && styles.selected
            )}
            key={index}
            onClick={() => handleSelect(index)}
          >
            {option}
          </div>
        ))}
    </div>
  );
};

export default Filter;
