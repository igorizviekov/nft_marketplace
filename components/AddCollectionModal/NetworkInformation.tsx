import React, { useState } from 'react';
import Input from '../ui/Input';
import { Dropdown } from '../ui/dropdown';
import { IModalSteps } from './AddCollectionModal.types';
import { INFTCategories } from '../Filter/Filter.types';
import { INetwork } from '../NetworkDropdown/NetworkDropdown.types';
import { Button } from '../ui/Button';
import { useStoreActions, useStoreState } from '../../store';

const NetworkInformation = ({ handleSteps }: IModalSteps) => {
  const [mainCategory, setMainCategory] = useState<number>(-1);
  const [subcategory, setSubCategory] = useState<number>(-1);
  const [chain, setChain] = useState<number>(-1);

  const setNetworkInformation = useStoreActions(
    (actions) => actions.collection.setNetworkInformation
  );
  const networkInformation = useStoreState(
    (state) => state.collection.networkInformation
  );

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

  const changeHandler = (e: React.ChangeEvent<Element>) => {};
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
        value={networkInformation.symbol}
        handleChange={(e) =>
          setNetworkInformation({
            ...networkInformation,
            symbol: (e.target as HTMLInputElement).value,
          })
        }
      />
      <Dropdown
        heading={'Network'}
        placeholder={'Select a network'}
        options={networks}
        checked={chain}
        onChange={setChain}
        openModal={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
      <Dropdown
        heading={'Main Category'}
        placeholder={'Select a category'}
        options={categories}
        checked={mainCategory}
        onChange={setMainCategory}
        openModal={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
      <Dropdown
        heading={'Subcategory'}
        placeholder={'Select a sub category'}
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
