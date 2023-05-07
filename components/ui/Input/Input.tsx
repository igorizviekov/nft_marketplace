// import { useCurrentNFTContext } from '../context/NFTContext';

import { useStoreState } from 'easy-peasy';
import { IStoreModel } from '../../../store/model/model.types';
import styles from './Input.module.scss';
import classNames from 'classnames';
import Icon from '../Icon/Icon';
type InputProps = {
  inputType: 'text' | 'textarea' | 'number' | 'percentage';
  title: string;
  placeholder: string;
  id: string;
  handleChange?: React.ChangeEventHandler;
  value?: string | number;
  error?: string;
  icon?: JSX.Element;
};

const Input = ({
  inputType,
  title,
  placeholder,
  handleChange,
  value,
  id,
  error,
  icon,
}: InputProps) => {
  const walletState = useStoreState((state: IStoreModel) => state.wallet);
  const { currency } = walletState;

  return (
    <div
      className={classNames(styles.container, error && styles.error)}
      tabIndex={0}
    >
      <p className={styles.title}>{title}</p>

      {inputType === 'number' ? (
        <>
          <input
            type="number"
            id={id}
            min="0"
            className={styles.text}
            placeholder={placeholder}
            onChange={handleChange}
            value={value}
          />
          <p className={styles.currency}>{currency}</p>
        </>
      ) : inputType === 'textarea' ? (
        <textarea
          id={id}
          className={styles.textarea}
          placeholder={placeholder}
          onChange={handleChange}
          value={value}
        />
      ) : inputType === 'text' ? (
        <input
          type="text"
          id={id}
          className={classNames(styles.text)}
          placeholder={placeholder}
          onChange={handleChange}
          value={value}
        />
      ) : (
        inputType === 'percentage' && (
          <input
            type="number"
            id={id}
            min="0"
            className={styles.text}
            placeholder={placeholder}
            onChange={handleChange}
            value={value}
          />
        )
      )}
      {icon && <Icon icon={icon} className={styles.icon} />}
      <small>{error}</small>
    </div>
  );
};

export default Input;
