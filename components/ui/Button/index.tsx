interface IButtonProps {
  isPrimary: boolean;
  label: string | JSX.Element | JSX.Element[];
  classStyles?: string;
  onClick: () => void;
  disabled?: boolean;
}

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
    className={`font-poppins font-semibold text-sm minLag:text-lg py-2 px-5  rounded-full  transition-all sm:w-full sm:my-4 max-w-xs ${
      classStyles?.length ? classStyles : ''
    }
     ${
       isPrimary && !disabled
         ? 'nft-gradient text-white dark:text-nft-black-1'
         : disabled
         ? 'bg-red-50 dark:text-nft-black-4'
         : ' dark:hover:border-white  border-solid  border-2 border-nft-black-4 hover:bg-nft-black-4  hover:text-white '
     }`}
  >
    {label}
  </button>
);
