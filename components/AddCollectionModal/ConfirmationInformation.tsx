import React from 'react';
import { IConfirmationModal } from './AddCollectionModal.types';
import { useStoreActions, useStoreState } from '../../store';
import { Button } from '../ui/Button';
import { useCreateCollection } from '../../service/useCreateCollection';
import styles from './AddCollectionModal.module.scss';
import { Spinner } from '../spinner';
import { excludeEmptyKeys } from './utils';
const ConfirmationInformation = ({ handleModalClose }: IConfirmationModal) => {
  const {
    generalInformation,
    image,
    royalties,
    networkInformation,
    isCreatingCollection,
  } = useStoreState((state) => state.createCollection);

  const { isCollectionCreated } = useStoreActions(
    (actions) => actions.createCollection
  );

  return (
    <>
      {isCreatingCollection ? (
        <Spinner />
      ) : (
        <>
          <h2>Please check the information before submitting!</h2>
          <div>
            <h2 className={styles.title}>General information</h2>
            <p>Name: {generalInformation.name}</p>
            <p>Description: {generalInformation.description}</p>
            {generalInformation.website && (
              <p>Website: {generalInformation.website}</p>
            )}
          </div>
          <div>
            <h2 className={styles.title}>Network information</h2>
            <p>Symbol: {networkInformation.symbol}</p>
            {networkInformation.network && (
              <p>Network: {networkInformation.network.currency_symbol}</p>
            )}
            <p>Primary Category: {networkInformation.categoryPrimary}</p>
            <p>Secondary Category: {networkInformation.categorySecondary}</p>
          </div>
          {royalties.length !== 0 && (
            <div>
              <h2 className={styles.title}>Royalties Information</h2>
              {royalties.map((royalty, index) => (
                <div key={index}>
                  <p>Wallet: {royalty.walletAddress}</p>
                  <p>Percentage: {royalty.percentage}</p>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      <Button
        isPrimary={false}
        label={'Create Collection'}
        disabled={isCreatingCollection}
        onClick={() =>
          useCreateCollection({
            image,
            generalInformation,
            networkInformation,
            royalties,
            isCollectionCreated,
            handleModalClose,
          })
        }
      />
    </>
  );
};

export default ConfirmationInformation;
