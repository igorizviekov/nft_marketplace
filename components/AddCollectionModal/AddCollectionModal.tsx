import React, { useState } from 'react';
import styles from './AddCollectionModal.module.scss';
import { IAddCollectionModalProps, Steps } from './AddCollectionModal.types';
import { Modal } from '../modal';
import { Button } from '../ui/Button';
import GeneralInformation from './GeneralInformation';
import NetworkInformation from './NetworkInformation';
import RoyaltiesInformation from './RoyaltiesInformation';
const AddCollectionModal = ({ handleModalClose }: IAddCollectionModalProps) => {
  const [steps, setSteps] = useState<Steps[]>([
    'General',
    'Network',
    'Royalties',
  ]);
  const [selected, setSelected] = useState<number>(0);

  function handleClick() {
    if (steps[selected] === 'Royalties') console.log('Save everything');
    else setSelected(selected + 1);
  }
  return (
    <Modal onClose={handleModalClose}>
      <div className={styles.column}>
        {steps[selected] !== 'General' && selected !== 0 && (
          <Button
            isPrimary={false}
            label={'Go Back'}
            onClick={() => setSelected(selected - 1)}
          />
        )}
        {steps[selected] === 'General' && <GeneralInformation />}
        {steps[selected] === 'Network' && <NetworkInformation />}
        {steps[selected] === 'Royalties' && <RoyaltiesInformation />}

        <p>Contract address will go here as info for the user?</p>

        <Button
          isPrimary={false}
          label={'Save collection'}
          onClick={handleClick}
        />
      </div>
    </Modal>
  );
};

export default AddCollectionModal;
