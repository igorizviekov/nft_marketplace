import { IUser } from '../../top-sellers/top-sellers-types';
import Image, { StaticImageData } from 'next/image';
import { TiTick } from 'react-icons/ti';

export const UserCard = ({ name, img, rank, balance }: IUser) => {
  return (
    <div className="min-w-190 minlg:min-w-240 dark:bg-nft-black-3 bg-whit rounded-3xl flex flex-col px-5 py-2 mx-5 shadow-lg">
      <div className="w-8 h-8 minlg:w-10 minlg:h-10  dark:bg-nft-black-2 nft-gradient flexCenter rounded-full">
        <p className="font-poppins text-white font-semibold text-base minlg:text-lg ">
          {rank}
        </p>
      </div>

      <div className="my-2 flex justify-center">
        <div className="relative w-28 h-28 minlg:w-28 minlg:h-28">
          <Image
            src={img}
            layout="fill"
            objectFit="cover"
            alt="creatorName"
            className="rounded-full"
          />
          <div className="absolute w-4 h-4 minlg:w-7 minlg:h-7 bottom-2 -right-0">
            <TiTick
              color="white"
              className="flexCenter w-7 h-7 bg-green-600 rounded-full absolute right-1"
            />
          </div>
        </div>
      </div>

      <div className="mt-3 minlg:mt-7 text-center flexCenter flex-col">
        <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-base">
          {name}
        </p>
        <p className="mt-1 font-poppins dark:text-white text-nft-black-1 font-semibold text-base">
          {balance.toFixed(4)}
          <span className="font-normal ml-1">ETH</span>
        </p>
      </div>
    </div>
  );
};
