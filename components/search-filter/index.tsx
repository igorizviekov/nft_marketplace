import React, { useState, useEffect } from 'react';
import { ActiveSelectOption, ISearchFilterProps } from './search-filter.types';
import { FcSearch } from 'react-icons/fc';

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
      <div className="flex-1 flexCenter dark:bg-nft-black-2 bg-white focus-within:border-2 border-nft-gray-1 px-4 sm:mx-5 sm:py-5 overflow-hidden transition-all dark:focus-within:border-none">
        <FcSearch size={35} />
        <input
          type="text"
          placeholder="Start typing to search NFT"
          className="dark:bg-nft-black-2 bg-white mx-4 w-full dark:text-white text-nft-black-1 font-normal text-base outline-none"
          onChange={(e) => setDebouncedSearch(e.target.value)}
          value={debouncedSearch}
        />
      </div>
      <div
        className="relative flexBetween ml-4 sm:ml-0 sm:mt-2 min-w-190 cursor-pointer   dark:bg-nft-black-2  px-4 rounded-md py-3  sm:py-2"
        onClick={() => setToggle((prev) => !prev)}
      >
        <p className="font-poppins dark:text-white text-nft-black-1 font-normal text-base">
          Order: {activeSelect}
        </p>

        {toggle && (
          <div className="absolute top-full left-0 right-0 w-full z-10 dark:bg-nft-black-2 bg-white border-2 border-nft-gray-1 sm:border-t-0 sm:border-r-0 sm:border-l-0 ">
            {activeSelectList.map((item, i) => (
              <p
                key={`${item}-${i}`}
                className="font-poppins dark:text-white text-nft-black-1 font-normal text-xs  cursor-pointer hover:bg-nft-gray-1 py-3 px-5 hover:dark:text-nft-black-1 "
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
