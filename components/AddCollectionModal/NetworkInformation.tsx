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
  const [categoryPrimary, setCategoryPrimary] = useState<number>(-1);
  const [categorySecondary, setCategorySecondary] = useState<number>(-1);
  const [chain, setChain] = useState<number>(-1);
  const { setNetworkInformation, setNetworkInformationError } = useStoreActions(
    (actions) => actions.createCollection
  );
  const { networkInformation, networkInformationError } = useStoreState(
    (state) => state.createCollection
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

  const handleClick = () => {
    setNetworkInformation({
      ...networkInformation,
      categoryPrimary: categories[categoryPrimary],
      categorySecondary: categories[categorySecondary],
    });
    handleSteps();
  };

  const handleError = () => {
    if (chain === -1 || categorySecondary === -1 || categoryPrimary === -1)
      setNetworkInformationError(true);
    else setNetworkInformationError(false);
  };

  useEffect(() => {
    handleError();
  }, [chain, categorySecondary, categoryPrimary]);
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
            symbol: (e.target as HTMLInputElement).value.toLocaleUpperCase(),
          })
        }
        error={validateSymbol(networkInformation.symbol)}
      />
      <Dropdown
        heading={'Network'}
        required
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
        required
        placeholder={'Select a category'}
        options={categories}
        checked={categoryPrimary}
        onChange={setCategoryPrimary}
        openModal={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
      <Dropdown
        heading={'categorySecondary'}
        required
        placeholder={'Select a sub category'}
        options={categories}
        checked={categorySecondary}
        onChange={setCategorySecondary}
        openModal={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
      <Button
        isPrimary={false}
        disabled={networkInformationError}
        label={'Next Step'}
        onClick={handleClick}
      />
    </>
  );
};

export default NetworkInformation;
