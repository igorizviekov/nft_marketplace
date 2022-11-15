import React from 'react';
import { Button } from '../Button';

export type BtnOption = {
  label: string;
  handleClick: () => void;
};
interface IButtonGroupProps {
  options: BtnOption[];
}
export const ButtonGroup = ({ options }: IButtonGroupProps) => {
  return (
    <div className="mx-2 flex gap-5">
      {options.map((option, i) => (
        <Button
          key={`${i}_${option.label}`}
          label={option.label}
          isPrimary={i === 0}
          onClick={option.handleClick}
        />
      ))}
    </div>
  );
};
