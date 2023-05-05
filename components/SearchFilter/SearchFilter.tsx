import React, { useState, useEffect } from 'react';
import { ActiveSelectOption, ISearchFilterProps } from './SearchFilter.types';
import { FcSearch } from 'react-icons/fc';
import { BackgroundBlur } from '../ui/background';

export const SearchFilter = ({
  activeSelect,
  setActiveSelect,
  onHandleSearch,
  onClearSearch,
}: ISearchFilterProps) => {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [toggle, setToggle] = useState(false);

  const activeSelectList: ActiveSelectOption[] = [
    'Recently added',
    'Price (low to high)',
    'Price (high to low)',
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(debouncedSearch);
    }, 1000);

    return () => clearTimeout(timer);
  }, [debouncedSearch]);

  useEffect(() => {
    if (search) {
      onHandleSearch(search);
    } else {
      onClearSearch();
    }
  }, [search]);

  return (
    <>
      <div className="z-10">
        <BackgroundBlur
          isVisible={toggle}
          onClick={() => setToggle((t) => !t)}
        />
      </div>
      <div className="flex-1 flexCenter bg-nft-black-2  focus-within:border-2 border-nft-gray-1 px-4 sm:mx-5 sm:py-5 overflow-hidden dark:focus-within:border-none">
        <FcSearch size={35} />
        <input
          type="text"
          placeholder="Start typing to search NFT"
          className="bg-nft-black-2 mx-4 w-full dark:text-white text-nft-black-1 font-normal text-base outline-none"
          onChange={(e) => setDebouncedSearch(e.target.value)}
          value={debouncedSearch}
        />
      </div>
      <div
        className="relative flexBetween ml-4 sm:m-4 min-w-190 cursor-pointer dark:bg-nft-black-2 px-4 rounded-md py-3  sm:py-2"
        onClick={() => setToggle((prev) => !prev)}
      >
        <p className="font-poppins dark:text-white text-nft-black-1 font-normal text-base">
          Order: {activeSelect}
        </p>

        {toggle && (
          <div className="absolute top-full left-0 right-0 w-full z-10 bg-nft-black-2 ">
            {activeSelectList.map((item, i) => (
              <p
                key={`${item}-${i}`}
                className="font-poppins dark:text-white text-nft-black-1 font-normal text-xs  cursor-pointer hover:bg-slate-100 py-3 px-5 hover:dark:bg-nft-black-1 transition-colors sm:py-6"
                onClick={() => setActiveSelect(item)}
              >
                {item}
              </p>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
