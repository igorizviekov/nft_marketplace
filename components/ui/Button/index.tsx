interface IButtonProps {
  isPrimary: boolean;
  label: string;
  classStyles?: string;
  onClick: () => void;
}

export const Button = ({
  label,
  isPrimary,
  classStyles,
  onClick,
}: IButtonProps) => (
  <button
    type="button"
    onClick={() => onClick()}
    className={`font-poppins font-semibold text-sm minLag:text-lg py-2 px-5  rounded-full  transition-all sm:w-full sm:my-12 ${
      isPrimary
        ? 'nft-gradient text-white'
        : ' dark:hover:border-white  border-solid  border-2 border-nft-black-4 hover:bg-nft-black-4  hover:text-white'
    } ${classStyles?.length ? classStyles : ''}`}
  >
    {label}
  </button>
);
