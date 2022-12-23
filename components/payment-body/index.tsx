import { IPaymentBodyProps } from './payment-body.types';
import Image from 'next/image';
import Link from 'next/link';

const PaymentBody = ({ nft, currency }: IPaymentBodyProps) => {
  const charityCut = (nft.price * 0.05).toFixed(2);
  return (
    <div className="flex flex-col">
      <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-base minlg:text-xl">
        Item
      </p>
      <div className="flexBetweenStart my-5 sm:my-2">
        <div className="flex-1 flexStartCenter">
          <div className="relative w-28 h-28">
            <Image alt="NFt" src={nft.img} height={100} width={100} />
          </div>
          <div className="flexCenterStart flex-col ml-5">
            <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm minlg:text-xl">
              {` ${nft.seller?.slice(0, 3)}...${nft.seller?.slice(
                nft.seller?.length - 5
              )}`}
            </p>
            <p className="font-poppins dark:text-white text-nft-black-1 text-sm minlg:text-xl font-normal">
              {nft.name}
            </p>
          </div>
        </div>
      </div>
      <p className="font-poppins dark:text-white text-nft-black-1 sm:font-light sm:mt-0">
        Buying this NFT, you will donate 15% of it's price to the following
        charity funds to support Ukraine:
      </p>
      <p className="font-poppins dark:text-white text-nft-black-1 mt-2 ml-10 font-semibold sm:font-light sm:mt-0">
        <Link href="https://helpingtoleave.org/" target="_blank">
          - Helping to leave ({charityCut} {currency})
        </Link>
      </p>
      <p className="font-poppins dark:text-white text-nft-black-1 mt-2 ml-10 font-semibold sm:font-light sm:mt-0">
        <Link href="https://savelife.in.ua/en/donate-en/" target="_blank">
          - Come Back Alive ({charityCut} {currency})
        </Link>
      </p>
      <p className="font-poppins dark:text-white text-nft-black-1 mt-2 ml-10 font-semibold sm:font-light sm:mt-0">
        <Link href="https://prytulafoundation.org/en" target="_blank">
          - Charity foundation of Serhiy Prytula ({charityCut} {currency})
        </Link>
      </p>
      <p className="font-poppins dark:text-white text-nft-black-1 mt-2 sm:font-light sm:mt-0">
        The rest ({(nft.price * 0.85).toFixed(2)} {currency}) will go to the
        NFT's creator
      </p>
      <div className="flexBetween mt-10 sm:mt-2">
        <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-base minlg:text-xl">
          Total
        </p>
        <p className="font-poppins dark:text-white text-nft-black-1 text-base minlg:text-xl font-normal">
          {nft.price} <span className="font-semibold">{currency}</span>
        </p>
      </div>
    </div>
  );
};

export default PaymentBody;
