import Image, { StaticImageData } from 'next/image';
import { ImRadioChecked2 } from 'react-icons/im';
import { useStoreState } from 'easy-peasy';
import { IStoreModel } from '../../../store/model/model.types';

interface IUserCardProps {
  name: string;
  img: string | StaticImageData;
  rank: number;
  balance: number;
}

export const UserCard = ({ name, img, rank, balance }: IUserCardProps) => {
  const walletState = useStoreState((state: IStoreModel) => state.wallet);
  const { currency } = walletState;

  const userName =
    name.length < 15
      ? name
      : `${name?.slice(0, 3)}...${name?.slice(name?.length - 5)}}`;

  return (
    <div className="min-w-190 minlg:min-w-240 dark:bg-nft-black-3 bg-whit rounded-3xl flex flex-col px-5 py-2 mx-5 shadow-md">
      <div className="w-8 h-8 minlg:w-10 minlg:h-10  dark:bg-nft-black-2 nft-gradient-2 flexCenter rounded-full">
        <p className="font-poppins text-white font-semibold text-base minlg:text-lg ">
          {rank}
        </p>
      </div>

      <div className="my-2 flex justify-center">
        <div className="relative w-28 h-28 minlg:w-28 minlg:h-28">
          <Image
            src={img}
            fill
            alt="creatorName"
            className="rounded-full"
            sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
            style={{
              objectFit: 'cover',
            }}
          />
          <div className="absolute w-4 h-4 minlg:w-7 minlg:h-7 bottom-2 -right-0">
            <ImRadioChecked2 className="fill-[#6ab04c] absolute left-2 -bottom-1" />
          </div>
        </div>
      </div>

      <div className="mt-3 minlg:mt-7 text-center flexCenter flex-col">
        <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-base">
          {userName}
        </p>
        <p className="mt-1 font-poppins dark:text-white text-nft-black-1 font-semibold text-base">
          {balance.toFixed(2)}
          <span className="font-normal ml-1">{currency}</span>
        </p>
      </div>
    </div>
  );
};
