interface IButtonProps {
  isPrimary: boolean;
  onClick: () => void;
  label?: string | JSX.Element | JSX.Element[];
  children?: JSX.Element;
  disabled?: boolean;
  className?: string;
}

import classNames from 'classnames';
import styles from './Button.module.scss';
import { Children } from 'react';

export const Button = ({
  label,
  isPrimary,
  onClick,
  disabled,
  children,
  className,
}: IButtonProps) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={classNames(
      disabled
        ? styles.disabled
        : isPrimary
        ? styles.primary
        : styles.secondary,
      className
    )}
  >
    {Children && children}
    <h3>{label}</h3>
  </button>
);
