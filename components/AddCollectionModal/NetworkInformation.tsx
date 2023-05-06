import React, { useState } from 'react';
import Input from '../ui/Input';
import { Dropdown } from '../ui/dropdown';

const NetworkInformation = () => {
  const [mainCategory, setMainCategory] = useState<number>(0);
  const [subcategory, setSubCategory] = useState<number>(0);
  const [chain, setChain] = useState<number>(0);
  return (
    <>
      <h1>Network Information</h1>
      <Input
        title={'Symbol'}
        inputType={'text'}
        placeholder={'Enter collections name'}
        id={'symbol'}
      />
      <Dropdown
        heading={'Network'}
        placeholder={'Enter collections name'}
        options={['BNB', 'SMR', 'BTC']}
        checked={chain}
        onChange={setChain}
        openModal={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
      <Dropdown
        heading={'Main Category'}
        placeholder={'Enter collections name'}
        options={['Cat 1', 'Cat 2', 'Cat 3']}
        checked={mainCategory}
        onChange={setMainCategory}
        openModal={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
      <Dropdown
        heading={'Subcategory'}
        placeholder={'Enter collections name'}
        options={['Cat 1', 'Cat 2', 'Cat 3']}
        checked={subcategory}
        onChange={setSubCategory}
        openModal={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
    </>
  );
};

export default NetworkInformation;
