import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

export interface INftCardProps {
  name: string;
  seller: string;
  owner: string;
  description: string;
  img: StaticImageData;
  price: number;
}

export const NftCard = ({ name, owner, img, price, seller }: INftCardProps) => (
  <Link
    href={{
      pathname: '/nft-details',
      query: { name, owner, price, seller },
    }}
  >
    <div className="flex-1 min-w-215 max-w-max xs:max-w-none sm:w-2/3sm:min-w-155 minmd:min-w-256 minlg:min-w-327 dark:bg-nft-black-3 bg-white rounded-2xl p-4 mx-5  my-4 sm:mb-4  sm:mt-0 sm:mx-2  cursor-pointer shadow-md hover:shadow-lg">
      <div className="relative w-full h-52 sm:h-36 minmd:h-60 minlg:h-300 rounded-2xl overflow-hidden">
        <Image
          src={img}
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
      <div className="mt-3 flex flex-col">
        <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm minlg:text-xl">
          {name}
        </p>
        <div className="flexBetween mt-1 minlg:mt-3 flex-row xs:flex-col xs:items-start xs:mt-3">
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xs minlg:text-lg">
            {price} <span className="normal">ETH</span>
          </p>
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xs minlg:text-lg">
            {owner}
          </p>
        </div>
      </div>
    </div>
  </Link>
);
