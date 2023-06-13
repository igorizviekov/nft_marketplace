import React from 'react';
import { IFilterProps } from './Filter.types';
import styles from './Filter.module.scss';
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
    <div className={styles.filter}>
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
