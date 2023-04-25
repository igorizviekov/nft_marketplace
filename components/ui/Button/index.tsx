interface IButtonProps {
  isPrimary: boolean;
  label: string | JSX.Element | JSX.Element[];
  classStyles?: string;
  onClick: () => void;
  disabled?: boolean;
}

import styles from './Button.module.scss';

export const Button = ({
  label,
  isPrimary,
  classStyles,
  onClick,
  disabled,
}: IButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className={isPrimary ? styles.primary : styles.secondary}
  >
    <h3>{label}</h3>
  </button>
);
