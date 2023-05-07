import React, { useEffect, useState } from 'react';
import Input from '../ui/Input';
import { Dropdown } from '../ui/dropdown';
import { IModalSteps } from './AddCollectionModal.types';
import { INFTCategories } from '../Filter/Filter.types';
import { INetwork } from '../NetworkDropdown/NetworkDropdown.types';
import { Button } from '../ui/Button';
import { useStoreActions, useStoreState } from '../../store';
import { validateSymbol } from './utils';

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

  const formError = useStoreState(
    (state) => state.collection.networkInformationError
  );

  const setFormError = useStoreActions(
    (actions) => actions.collection.setNetworkInformationError
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

  const changeHandler = (e: React.ChangeEvent<Element>) => {
    setNetworkInformation({
      ...networkInformation,
      [e.currentTarget.id]: (e.target as HTMLInputElement).value,
    });
  };
  const handleClick = () => {
    handleSteps();
  };

  return (
    <>
      <h1>Network Information</h1>
      <Input
        title={'Symbol'}
        inputType={'text'}
        placeholder={'Enter collections name'}
        id={'symbol'}
        value={networkInformation.symbol}
        handleChange={changeHandler}
        error={validateSymbol(networkInformation.symbol)}
      />
      <Dropdown
        heading={'Network'}
        required
        id="network"
        placeholder={'Select a network'}
        options={networks}
        value={networkInformation.network}
        onChange={changeHandler}
        openModal={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
      <Dropdown
        heading={'Main Category'}
        required
        id="mainCategory"
        placeholder={'Select a category'}
        options={categories}
        value={networkInformation.mainCategory}
        onChange={changeHandler}
        openModal={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
      <Dropdown
        heading={'Subcategory'}
        required
        id={'subCategory'}
        value={networkInformation.subCategory}
        placeholder={'Select a sub category'}
        options={categories}
        onChange={changeHandler}
        openModal={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
      <Button
        isPrimary={false}
        disabled={formError}
        label={'Next Step'}
        onClick={handleClick}
      />
    </>
  );
};

export default NetworkInformation;
