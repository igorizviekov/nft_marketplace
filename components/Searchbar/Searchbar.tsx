import React, { useState, useEffect } from 'react';
import { ActiveSelectOption, ISearchFilterProps } from './Searchbar.types';
import Input from '../ui/Input';
export const Searchbar = ({
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
    </>
  );
};
