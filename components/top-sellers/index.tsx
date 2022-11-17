import { useRef } from 'react';
import { randomId } from '../../utils';
import { UserCard } from '../ui/user-card';
import { IUser } from './top-sellers-types';
export const TopSellers = () => {
  const parentRef = useRef(null);
  const scrollRef = useRef(null);

  const creatorMock: IUser[] = [
    {
      img: 'https://xsgames.co/randomusers/avatar.php?g=female',
      name: `x0${randomId(3)}...${randomId(4)}`,
      value: 5.2,
      rank: 5,
    },
    {
      img: 'https://xsgames.co/randomusers/avatar.php?g=male',
      name: `x0${randomId(3)}...${randomId(4)}`,
      value: 3.2,
      rank: 6,
    },
    {
      img: 'https://xsgames.co/randomusers/avatar.php?g=male',
      name: `x0${randomId(3)}...${randomId(4)}`,
      value: 1.1,
      rank: 6,
    },
    {
      img: 'https://xsgames.co/randomusers/avatar.php?g=male',
      name: `x0${randomId(3)}...${randomId(4)}`,
      value: 0.8,
      rank: 7,
    },
    {
      img: 'https://xsgames.co/randomusers/avatar.php?g=male',
      name: 'Bohdan Slavikov',
      value: 0.5,
      rank: 8,
    },
  ];

  return (
    <div>
      <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold my-8">
        Best Creators
      </h1>
      <div className="relative flex-1 max-w-full flex my-10" ref={parentRef}>
        <div
          className="flex flex-row w-max overflow-x-scroll no-scrollbar select-none"
          ref={scrollRef}
        >
          {creatorMock.map((user, i) => (
            <UserCard key={`user-${randomId(4)}`} {...user} />
          ))}
        </div>
      </div>
    </div>
  );
};
