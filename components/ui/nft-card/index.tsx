import { useStoreState } from 'easy-peasy';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { IStoreModel } from '../../../store/model/model.types';

export interface INftCardProps {
  seller: string;
  owner: string;
  [key: string]: string;
}

export const NftCard = ({
  owner,
  price,
  seller,
  tokenId,
  ...metadata
}: INftCardProps) => {
  const { image, name } = metadata;
  const walletState = useStoreState((state: IStoreModel) => state.wallet);
  const { currency } = walletState;

  return (
    <Link
      href={{
        pathname: '/nft-details',
        query: {
          owner,
          price,
          seller,
          tokenId,
          ...metadata,
        },
      }}
    >
      <div className="flex-1 min-w-215 max-w-max xs:max-w-none sm:w-2/3sm:min-w-155 minmd:min-w-256 minlg:min-w-327 dark:bg-nft-black-3 bg-white rounded-2xl p-4 mx-3  my-4 sm:mb-4  sm:mt-0 sm:mx-2  cursor-pointer shadow-md hover:shadow-lg">
        <div className="relative w-full h-52 sm:h-36 minmd:h-60 minlg:h-300 rounded-2xl overflow-hidden">
          <Image
            src={image}
            alt="nft"
            fill
            sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
            style={{
              objectFit: 'cover',
            }}
          />
        </div>
        <div className="mt-3 flex flex-col sm:items-center">
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm minlg:text-xl">
            {name}
          </p>
          <div className="flexBetween mt-1 minlg:mt-3 flex-row xs:flex-col xs:items-start xs:mt-3">
            <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xs minlg:text-lg">
              {Number(price).toFixed(2)}
              <span className="normal"> {currency}</span>
            </p>
            <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xs minlg:text-lg">
              {owner.length > 10 &&
                `${owner.slice(0, 3)}...${owner.slice(owner.length - 5)}`}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};
