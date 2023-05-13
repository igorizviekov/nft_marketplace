import React from 'react';
import { IModalSteps } from './AddCollectionModal.types';
import { useStoreState } from '../../store';
import { Button } from '../ui/Button';
import { useCreateCollection } from '../../service/useCreateCollection';

const ConfirmationInformation = ({ handleSteps }: IModalSteps) => {
  const { generalInformation, royalties, networkInformation } = useStoreState(
    (state) => state.createCollection
  );
  return (
    <div>
      <h2>Please check the information before submitting!</h2>
      <div>
        <p>General information</p>
        <p>name: {generalInformation.name}</p>
        <p>name: {generalInformation.description}</p>
        <p>name: {generalInformation.website}</p>
      </div>
      <div>
        <p>Network information</p>
        <p>symbol: {networkInformation.symbol}</p>
        <p>network: {networkInformation.network}</p>
        <p>Primary Category: {networkInformation.mainCategory}</p>
        <p>Secondary Category: {networkInformation.subCategory}</p>
      </div>
      <div>
        <p>Royalties Information</p>
        {royalties.map((royalty, index) => (
          <div key={index}>
            <p>{royalty.walletAddress}</p>
            <p>{royalty.percentage}</p>
          </div>
        ))}
      </div>

      <Button
        isPrimary={false}
        label={'Create Collection'}
        onClick={() =>
          useCreateCollection({
            generalInformation,
            networkInformation,
            royalties,
          })
        }
      />
    </div>
  );
};

export default ConfirmationInformation;
