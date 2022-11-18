import { randomId } from '../../utils';
import { INftCardProps, NftCard } from '../ui/nft-card';
import { useEffect, useState } from 'react';
import { Search } from '../search';
import nftIng_1 from '../../assets/img/nft/nft1.png';
import nftIng_2 from '../../assets/img/nft/nft2.png';
import nftIng_3 from '../../assets/img/nft/nft3.png';
import nftIng_4 from '../../assets/img/nft/nft4.png';
import nftIng_5 from '../../assets/img/nft/nft5.png';
import nftIng_6 from '../../assets/img/nft/nft6.jpeg';
import nftIng_7 from '../../assets/img/nft/nft7.png';
import nftIng_8 from '../../assets/img/nft/nft8.png';
import nftIng_9 from '../../assets/img/nft/nft9.png';
import nftIng_10 from '../../assets/img/nft/nft10.jpg';

export const NftList = () => {
  const mockedNFTs: INftCardProps[] = [
    {
      name: 'buzzing NFT',
      seller: `x0${randomId(3)}...${randomId(4)}`,
      owner: `x0${randomId(3)}...${randomId(4)}`,
      description: 'Cool NFT on sale',
      price: 0.2,
      img: nftIng_1,
    },
    {
      name: 'buzzing NFT',
      seller: `x0${randomId(3)}...${randomId(4)}`,
      owner: `x0${randomId(3)}...${randomId(4)}`,
      description: 'Cool NFT on sale',
      price: 0.2,
      img: nftIng_2,
    },
    {
      name: 'buzzing NFT',
      seller: `x0${randomId(3)}...${randomId(4)}`,
      owner: `x0${randomId(3)}...${randomId(4)}`,
      description: 'Cool NFT on sale',
      price: 0.2,
      img: nftIng_3,
    },
    {
      name: 'buzzing NFT',
      seller: `x0${randomId(3)}...${randomId(4)}`,
      owner: `x0${randomId(3)}...${randomId(4)}`,
      description: 'Cool NFT on sale',
      price: 0.2,
      img: nftIng_4,
    },
    {
      name: 'buzzing NFT',
      seller: `x0${randomId(3)}...${randomId(4)}`,
      owner: `x0${randomId(3)}...${randomId(4)}`,
      description: 'Cool NFT on sale',
      price: 0.2,
      img: nftIng_5,
    },
    {
      name: 'buzzing NFT',
      seller: `x0${randomId(3)}...${randomId(4)}`,
      owner: `x0${randomId(3)}...${randomId(4)}`,
      description: 'Cool NFT on sale',
      price: 0.2,
      img: nftIng_6,
    },
    {
      name: 'buzzing NFT',
      seller: `x0${randomId(3)}...${randomId(4)}`,
      owner: `x0${randomId(3)}...${randomId(4)}`,
      description: 'Cool NFT on sale',
      price: 0.2,
      img: nftIng_7,
    },
    {
      name: 'buzzing NFT',
      seller: `x0${randomId(3)}...${randomId(4)}`,
      owner: `x0${randomId(3)}...${randomId(4)}`,
      description: 'Cool NFT on sale',
      price: 0.2,
      img: nftIng_8,
    },
    {
      name: 'buzzing NFT',
      seller: `x0${randomId(3)}...${randomId(4)}`,
      owner: `x0${randomId(3)}...${randomId(4)}`,
      description: 'Cool NFT on sale',
      price: 0.2,
      img: nftIng_9,
    },
    {
      name: 'buzzing NFT',
      seller: `x0${randomId(3)}...${randomId(4)}`,
      owner: `x0${randomId(3)}...${randomId(4)}`,
      description: 'Cool NFT on sale',
      price: 0.4,
      img: nftIng_10,
    },
  ];

  const [nftList, setNftList] = useState<INftCardProps[]>([]);
  useEffect(() => setNftList(mockedNFTs), []);

  return (
    <div className="mb-12">
      <div className="flex justify-between flex-center">
        <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold my-5 px-5 ">
          Trending NFTs
        </h1>
        <Search />
      </div>
      <div className="w-full flex flex-wrap justify-start sm:justify-center ">
        {nftList.map((nft, i) => (
          <NftCard key={nft.owner + i} {...nft} />
        ))}
      </div>
    </div>
  );
};
