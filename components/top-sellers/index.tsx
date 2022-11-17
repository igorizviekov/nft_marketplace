import { useEffect, useRef, useState } from 'react';
import { randomId } from '../../utils';
import { UserCard } from '../ui/user-card';
import { IUser } from './top-sellers-types';
import userLogo_1 from '../../assets/img/users/user_1.avif';
import userLogo_2 from '../../assets/img/users/user_2.jpeg';
import userLogo_3 from '../../assets/img/users/user_3.avif';
import userLogo_4 from '../../assets/img/users/user_4.jpg';
import userLogo_5 from '../../assets/img/users/user_5.jpg';
import userLogo_6 from '../../assets/img/users/user_6.jpg';
import userLogo_7 from '../../assets/img/users/user_7.jpg';
import userLogo_8 from '../../assets/img/users/user_8.jpg';
import userLogo_9 from '../../assets/img/users/user_9.jpg';
import userLogo_10 from '../../assets/img/users/user_10.jpg';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';

export const TopSellers = () => {
  const parentRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [topSellers, setTopSellers] = useState<IUser[]>([]);

  const creatorMock: IUser[] = [
    {
      img: userLogo_1,
      name: `x0${randomId(3)}...${randomId(4)}`,
      balance: 5.2,
      rank: 1,
    },
    {
      img: userLogo_2,
      name: `x0${randomId(3)}...${randomId(4)}`,
      balance: 3.2,
      rank: 2,
    },
    {
      img: userLogo_9,
      name: `x0${randomId(3)}...${randomId(4)}`,
      balance: 0.8,
      rank: 3,
    },

    {
      img: userLogo_4,
      name: `x0${randomId(3)}...${randomId(4)}`,
      balance: 0.8,
      rank: 4,
    },
    {
      img: userLogo_5,
      name: `x0${randomId(3)}...${randomId(4)}`,
      balance: 0.8,
      rank: 5,
    },
    {
      img: userLogo_6,
      name: `x0${randomId(3)}...${randomId(4)}`,
      balance: 0.8,
      rank: 6,
    },
    {
      img: userLogo_7,
      name: `x0${randomId(3)}...${randomId(4)}`,
      balance: 0.8,
      rank: 7,
    },
    {
      img: userLogo_8,
      name: `x0${randomId(3)}...${randomId(4)}`,
      balance: 0.8,
      rank: 8,
    },
    {
      img: userLogo_10,
      name: `x0${randomId(3)}...${randomId(4)}`,
      balance: 0.8,
      rank: 9,
    },
    {
      img: userLogo_3,
      name: `x0${randomId(3)}...${randomId(4)}`,
      balance: 1.1,
      rank: 10,
    },
  ];

  useEffect(() => setTopSellers(creatorMock), []);

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

  return (
    <div className="relative">
      <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold my-8">
        Best Creators
      </h1>
      <div
        className="relative flex-1 max-w-full flex overflow-x-auto no-scrollbar "
        ref={parentRef}
      >
        <div
          className="flex flex-row w-full overflow-x-auto no-scrollbar select-none py-5"
          ref={scrollRef}
        >
          {topSellers.map((user, i) => (
            <UserCard key={`user-${randomId(4)}`} {...user} />
          ))}
        </div>
      </div>
      <div
        onClick={() => handleScroll('left')}
        className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-1/2 cursor-pointer -left-8 active:scale-125 transition-all"
      >
        <BsChevronCompactLeft size={40} />
      </div>
      <div
        onClick={() => handleScroll('right')}
        className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-1/2 cursor-pointer -right-8 active:scale-125 transition-all"
      >
        <BsChevronCompactRight size={40} />
      </div>
    </div>
  );
};
