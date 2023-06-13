import React from 'react';
import styles from './Traits.module.scss';
import { ITraitListProps } from './Traits.types';
import { BsXCircleFill } from 'react-icons/bs';
import Icon from '../ui/Icon/Icon';
const TraitsList = ({ traits, deleteTrait }: ITraitListProps) => {
  return (
    <>
      {traits.length > 0 && (
        <div className={styles.traitsContainer}>
          {traits.map((trait, index) => (
            <div className={styles.trait} key={index + trait.traitType}>
              <div>
                <p>Type: {trait.traitType}</p>
                <p>Value: {trait.value}</p>
              </div>
              <Icon
                icon={
                  <BsXCircleFill style={{ width: '30px', height: '30px' }} />
                }
                className={styles.icon}
                onClick={() => deleteTrait(trait)}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default TraitsList;
