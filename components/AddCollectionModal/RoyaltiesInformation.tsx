import React from 'react';
import Royalties from '../Royalties/Royalties';
import { useStoreState, useStoreActions } from '../../store';
import Icon from '../ui/Icon/Icon';
import styles from '../Royalties/Royalties.module.scss';
import { BsXCircleFill } from 'react-icons/bs';
const RoyaltiesInformation = () => {
  const royalties = useStoreState((state) => state.collection.royalties);
  const deleteRoyalty = useStoreActions(
    (actions) => actions.collection.deleteRoyalty
  );
  return (
    <>
      <h1>Royalties information</h1>
      <div className={styles.royaltyContainer}>
        {royalties &&
          royalties.map((royalty, index) => (
            <div className={styles.royalty} key={index + royalty.walletAddress}>
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
      <Royalties />
    </>
  );
};

export default RoyaltiesInformation;
