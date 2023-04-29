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
        <div className="bg-nft-black-1  border dark:border-nft-black-1 border-nft-gray-2 rounded-lg w-full outline-none font-poppins dark:text-white text-nft-gray-2 text-base mt-4 px-4 py-3 flexBetween flex-row">
          <input
            type="number"
            min="0"
            className={styles.text}
            placeholder={placeholder}
            onChange={handleChange}
            value={value}
          />
          <p className="flex-1 font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">
            {currency}
          </p>
        </div>
      ) : inputType === 'textarea' ? (
        <textarea
          name=""
          id=""
          rows={10}
          className={styles.textarea}
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
