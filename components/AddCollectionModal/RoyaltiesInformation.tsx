import React from 'react';
import Royalties from '../Royalties/Royalties';
import { useStoreState, useStoreActions } from '../../store';
import Icon from '../ui/Icon/Icon';
import styles from '../Royalties/Royalties.module.scss';
import { BsXCircleFill } from 'react-icons/bs';
import { IModalSteps } from './AddCollectionModal.types';
import { Button } from '../ui/Button';
const RoyaltiesInformation = ({ handleSteps }: IModalSteps) => {
  const royalties = useStoreState((state) => state.collection.royalties);
  const deleteRoyalty = useStoreActions(
    (actions) => actions.collection.deleteRoyalty
  );

  function handleClick() {
    handleSteps();
  }
  return (
    <>
      <h1>Royalties information</h1>
      <Royalties />
      {royalties.length > 0 && (
        <>
          <div className={styles.royaltyContainer}>
            {royalties.map((royalty, index) => (
              <div
                className={styles.royalty}
                key={index + royalty.walletAddress}
              >
                <div>
                  <p>Address: {royalty.walletAddress}</p>
                  <p>Percentage: {royalty.percentage}</p>
                </div>
                <Icon
                  icon={
                    <BsXCircleFill style={{ width: '30px', height: '30px' }} />
                  }
                  className={styles.icon}
                  onClick={() => deleteRoyalty(royalty)}
                />
              </div>
            ))}
          </div>
        </>
      )}
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
