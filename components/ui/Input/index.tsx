// import { useCurrentNFTContext } from '../context/NFTContext';

import { useStoreState } from 'easy-peasy';
import { IStoreModel } from '../../../store/model/model.types';

type InputProps = {
  inputType: 'input' | 'textarea' | 'number';
  title: string;
  placeholder: string;
  handleClick?: React.ChangeEventHandler;
  value?: string | number;
};

const Input = ({
  inputType,
  title,
  placeholder,
  handleClick,
  value,
}: InputProps) => {
  const walletState = useStoreState((state: IStoreModel) => state.wallet);
  const { currency } = walletState;

  return (
    <div className="mt-10 w-full">
      <p className="flex-1 font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">
        {title}
      </p>

      {inputType === 'number' ? (
        <div className="dark:bg-nft-black-1 bg-white border dark:border-nft-black-1 border-nft-gray-2 rounded-lg w-full outline-none font-poppins dark:text-white text-nft-gray-2 text-base mt-4 px-4 py-3 flexBetween flex-row">
          <input
            type="number"
            min="0"
            className="flex w-full dark:bg-nft-black-1 bg-white outline-none"
            placeholder={placeholder}
            onChange={handleClick}
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
          className="dark:bg-nft-black-1 bg-white border dark:border-nft-black-1 border-nft-gray-2 rounded-lg w-full outline-none font-poppins dark:text-white text-nft-gray-2 text-base mt-4 px-4 py-3"
          placeholder={placeholder}
          onChange={handleClick}
        />
      ) : (
        <input
          type="text"
          className="dark:bg-nft-black-1 bg-white  dark:border-nft-black-1 border-nft-gray-2 rounded-lg w-full outline-none font-poppins dark:text-white text-nft-gray-2 text-base mt-4 px-4 py-3"
          placeholder={placeholder}
          onChange={handleClick}
        />
      )}
    </div>
  );
};

Input.defaultProps = {
  handleClick: () => {},
};

export default Input;
