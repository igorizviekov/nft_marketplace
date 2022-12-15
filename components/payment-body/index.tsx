import { IPaymentBodyProps } from './payment-body.types';
import Image from 'next/image';

const PaymentBody = ({ nft, currency }: IPaymentBodyProps) => {
  return (
    <div className="flex flex-col">
      <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-base minlg:text-xl">
        Item
      </p>

      <div className="flexBetweenStart my-5">
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

      <div className="flexBetween mt-10">
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
