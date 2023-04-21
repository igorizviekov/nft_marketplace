// import { useCurrentNFTContext } from '../context/NFTContext';

import { useStoreState } from 'easy-peasy';
import { IStoreModel } from '../../../store/model/model.types';
import styles from './Input.module.scss';
type InputProps = {
  inputType: 'text' | 'textarea' | 'number';
  title: string;
  placeholder: string;
  handleChange?: React.ChangeEventHandler;
  value?: string | number;
};

const Input = ({
  inputType,
  title,
  placeholder,
  handleChange,
  value,
}: InputProps) => {
  const walletState = useStoreState((state: IStoreModel) => state.wallet);
  const { currency } = walletState;

  return (
    <div className={styles.container}>
      <p className={styles.title}>{title}</p>

      {inputType === 'number' ? (
        <input
          type="number"
          min="0"
          className={styles.text}
          placeholder={placeholder}
          onChange={handleChange}
          value={value}
        />
      ) : inputType === 'textarea' ? (
        <textarea
          name=""
          id=""
          rows={10}
          className={styles.text}
          placeholder={placeholder}
          onChange={handleChange}
        />
      ) : (
        <input
          type="text"
          className={styles.text}
          placeholder={placeholder}
          onChange={handleChange}
        />
      )}
    </div>
  );
};

Input.defaultProps = {
  handleChange: () => {},
};

export default Input;
