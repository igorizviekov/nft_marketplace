import { useEffect, useRef, useState } from 'react';
import { randomId } from '../../utils';
import { UserCard } from '../ui/user-card';
import userLogo_1 from '../../assets/img/users/creator1.png';
import userLogo_2 from '../../assets/img/users/creator2.png';
import userLogo_3 from '../../assets/img/users/creator3.png';
import userLogo_4 from '../../assets/img/users/creator4.png';
import userLogo_5 from '../../assets/img/users/creator5.png';
import userLogo_6 from '../../assets/img/users/creator6.png';
import userLogo_7 from '../../assets/img/users/creator7.png';
import userLogo_8 from '../../assets/img/users/creator8.png';
import userLogo_9 from '../../assets/img/users/creator9.png';
import userLogo_10 from '../../assets/img/users/creator10.png';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { ITopCreator } from './top-sellers.types';

interface ITopSellersProps {
  creators: ITopCreator[];
}
export const TopSellers = ({ creators }: ITopSellersProps) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const userLogos = [
    userLogo_1,
    userLogo_2,
    userLogo_3,
    userLogo_4,
    userLogo_5,
    userLogo_6,
    userLogo_7,
    userLogo_8,
    userLogo_9,
    userLogo_10,
  ];

  const handleScroll = (direction: 'left' | 'right') => {
    const { current } = scrollRef;
    const scrollAmount = window.innerWidth > 1800 ? 270 : 210;

    if (current) {
      if (direction === 'left') {
        current.scrollLeft -= scrollAmount;
      } else {
        current.scrollLeft += scrollAmount;
      }
    }
  };

  const arrows = creators.length > 3 && (
    <>
      <div
        onClick={() => handleScroll('left')}
        className="absolute top-1/2 cursor-pointer -left-8 sm:hidden"
      >
        <BsChevronCompactLeft
          size={40}
          className="active:scale-125 transition-scale"
        />
      </div>
      <div
        onClick={() => handleScroll('right')}
        className="absolute top-1/2 cursor-pointer -right-8 sm:hidden"
      >
        <BsChevronCompactRight
          size={40}
          className="active:scale-125 transition-scale"
        />
      </div>
    </>
  );

  return (
    <div className="relative">
      <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold my-8 px-5 sm:text-center sm:w-full animate-fadeIn">
        {creators.length ? 'Top Creators' : ''}
      </h1>
      <div
        className="relative flex-1 max-w-full flex overflow-x-auto no-scrollbar "
        ref={parentRef}
      >
        <div
          className="flex flex-row w-full overflow-x-auto no-scrollbar select-none pb-5 "
          ref={scrollRef}
        >
          {creators.map((user, i) => (
            <UserCard
              key={`user-${i}`}
              name={user.nickname || user.seller}
              rank={i + 1}
              balance={user.sum}
              img={user.avatar || userLogos[i]}
            />
          ))}
        </div>
      </div>
      {arrows}
    </div>
  );
};
