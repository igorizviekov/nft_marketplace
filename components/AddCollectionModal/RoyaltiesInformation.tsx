import React from 'react';
import Royalties from '../Royalties/Royalties';
import { useStoreState, useStoreActions } from '../../store';
import { IModalSteps } from './AddCollectionModal.types';
import { Button } from '../ui/Button';
import RoyaltiesList from '../Royalties/RoyaltiesList';
const RoyaltiesInformation = ({ handleSteps }: IModalSteps) => {
  const royalties = useStoreState((state) => state.collection.royalties);
  const deleteRoyalty = useStoreActions(
    (actions) => actions.collection.deleteRoyalty
  );
  const addRoyalty = useStoreActions(
    (actions) => actions.collection.addRoyalty
  );

  function handleClick() {
    handleSteps();
  }
  return (
    <>
      <h1>Royalties information</h1>
      <Royalties addRoyalty={addRoyalty} />
      <RoyaltiesList royalties={royalties} deleteRoyalty={deleteRoyalty} />
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
