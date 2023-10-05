import React from 'react';
import Royalties from '../Royalties/Royalties';
import { useStoreState, useStoreActions } from '../../store';
import { IModalSteps } from './AddCollectionModal.types';
import { Button } from '../ui/Button';
import RoyaltiesList from '../Royalties/RoyaltiesList';
import Input from '../ui/Input';
const RoyaltiesInformation = ({ handleSteps }: IModalSteps) => {
  const { royalties, royaltiesError, mintPrice } = useStoreState(
    (state) => state.createCollection
  );
  const { deleteRoyalty, addRoyalty, setRoyaltiesError, setMintPrice } =
    useStoreActions((actions) => actions.createCollection);

  function handleClick() {
    handleSteps();
  }
  return (
    <>
      <h1>Royalties information</h1>
      <Royalties
        royalties={royalties}
        addRoyalty={addRoyalty}
        royaltiesError={royaltiesError}
        setFormError={setRoyaltiesError}
      />
      <RoyaltiesList royalties={royalties} deleteRoyalty={deleteRoyalty} />
      <Input
        inputType={'number'}
        title={'Mint Price'}
        placeholder={'Initial price'}
        id={'price'}
        value={mintPrice}
        handleChange={(e) =>
          setMintPrice(Number((e.target as HTMLInputElement).value))
        }
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

export default RoyaltiesInformation;
