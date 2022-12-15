import React from 'react';
import { Button } from '../Button';
import styles from './button.styles.module.scss';
export type BtnOption = {
  label: string | JSX.Element | JSX.Element[];
  handleClick: () => void;
};

interface IButtonGroupProps {
  options: BtnOption[];
}
export const ButtonGroup = ({ options }: IButtonGroupProps) => {
  return (
    <div className={`${styles.button}`}>
      {options.map((option, i) => (
        <Button
          key={`${i}_${option.label}`}
          label={option.label}
          isPrimary={i === 0}
          onClick={option.handleClick}
          classStyles="mx-2"
        />
      ))}
    </div>
  );
};
