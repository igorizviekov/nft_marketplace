import React, { useState, useEffect } from 'react';
import { ISearchFilterProps } from './Searchbar.types';
import styles from './Searchbar.module.scss';
import Input from '../ui/Input';
export const Searchbar = ({
  onHandleSearch,
  onClearSearch,
}: ISearchFilterProps) => {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState(search);

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
    <div className={styles.container}>
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
    </div>
  );
};
