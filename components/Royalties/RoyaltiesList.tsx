import React from 'react';
import styles from './Royalties.module.scss';
import { IRoyaltiesListProps } from './Royalties.types';
import { BsXCircleFill } from 'react-icons/bs';
import Icon from '../ui/Icon/Icon';
const RoyaltiesList = ({ royalties, deleteRoyalty }: IRoyaltiesListProps) => {
  return (
    <>
      {royalties.length > 0 && (
        <div className={styles.royaltyContainer}>
          {royalties.map((royalty, index) => (
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
      )}
    </>
  );
};

export default RoyaltiesList;
