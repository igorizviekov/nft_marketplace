interface IButtonProps {
  isPrimary: boolean;
  label: string | JSX.Element | JSX.Element[];
  onClick: () => void;
  disabled?: boolean;
}

import styles from './Button.module.scss';

export const Button = ({
  label,
  isPrimary,
  onClick,
  disabled,
}: IButtonProps) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={
      disabled ? styles.disabled : isPrimary ? styles.primary : styles.secondary
    }
  >
    <h3>{label}</h3>
  </button>
);
