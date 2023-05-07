import React, { useState } from 'react';
import Input from '../ui/Input';
import { Dropdown } from '../ui/dropdown';
import {
  IModalSteps,
  INetworkInformationInput,
} from './AddCollectionModal.types';
import { INFTCategories } from '../Filter/Filter.types';
import { INetwork } from '../NetworkDropdown/NetworkDropdown.types';
import { Button } from '../ui/Button';

const NetworkInformation = ({ handleSteps }: IModalSteps) => {
  const [mainCategory, setMainCategory] = useState<number>(0);
  const [subcategory, setSubCategory] = useState<number>(0);
  const [chain, setChain] = useState<number>(0);

  const categories: INFTCategories[] = [
    'Art',
    'Collectibles',
    'Games',
    'Music',
    'PFPS',
    'Sports',
    'Virtual Worlds',
  ];
  const networks: INetwork[] = ['ETH', 'POLYGON', 'SMR'];
  const [formInput, setFormInput] = useState<INetworkInformationInput>({
    symbol: '',
    network: 'ETH',
    mainCategory: 'Cat 1',
    subCategory: 'Cat 1',
  });

  function handleClick() {
    handleSteps();
  }
  return (
    <>
      <h1>Network Information</h1>
      <Input
        title={'Symbol'}
        inputType={'text'}
        placeholder={'Enter collections name'}
        id={'symbol'}
        value={formInput.symbol}
        handleChange={(e) =>
          setFormInput({
            ...formInput,
            symbol: (e.target as HTMLInputElement).value,
          })
        }
      />
      <Dropdown
        heading={'Network'}
        placeholder={'Enter collections name'}
        options={networks}
        checked={chain}
        onChange={setChain}
        openModal={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
      <Dropdown
        heading={'Main Category'}
        placeholder={'Enter collections name'}
        options={categories}
        checked={mainCategory}
        onChange={setMainCategory}
        openModal={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
      <Dropdown
        heading={'Subcategory'}
        placeholder={'Enter collections name'}
        options={categories}
        checked={subcategory}
        onChange={setSubCategory}
        openModal={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
      <Button
        isPrimary={false}
        disabled={false}
        label={'Next Step'}
        onClick={handleClick}
      />
    </>
  );
};

export default NetworkInformation;
