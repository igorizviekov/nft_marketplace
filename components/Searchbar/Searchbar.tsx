import React, { useState, useEffect } from 'react';
import { ActiveSelectOption, ISearchFilterProps } from './Searchbar.types';
import Input from '../ui/Input';
export const Searchbar = ({
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
      <Input
        title={''}
        placeholder={'Search an NFT Collection or Creator'}
        inputType={'text'}
        id={'search'}
        handleChange={(e) =>
          setDebouncedSearch((e.target as HTMLInputElement).value)
        }
        value={debouncedSearch}
      />
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
