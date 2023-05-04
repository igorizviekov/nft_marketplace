// import { useCurrentNFTContext } from '../context/NFTContext';

import { useStoreState } from 'easy-peasy';
import { IStoreModel } from '../../../store/model/model.types';
import styles from './Input.module.scss';
import classNames from 'classnames';
type InputProps = {
  inputType: 'text' | 'textarea' | 'number';
  title: string;
  placeholder: string;
  id: string;
  handleChange?: React.ChangeEventHandler;
  value?: string | number;
  error?: string;
};

const Input = ({
  inputType,
  title,
  placeholder,
  handleChange,
  value,
  id,
  error,
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
      ) : (
        <input
          type="text"
          id={id}
          className={classNames(styles.text)}
          placeholder={placeholder}
          onChange={handleChange}
          value={value}
        />
      )}
      <small>{error}</small>
    </div>
  );
};

Input.defaultProps = {
  handleChange: () => {},
};

export default Input;
