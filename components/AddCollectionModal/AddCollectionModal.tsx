import React, { useState } from 'react';
import styles from './AddCollectionModal.module.scss';
import { IAddCollectionModalProps, Steps } from './AddCollectionModal.types';
import { Modal } from '../modal';
import { Button } from '../ui/Button';
import GeneralInformation from './GeneralInformation';
import NetworkInformation from './NetworkInformation';
import RoyaltiesInformation from './RoyaltiesInformation';
import Icon from '../ui/Icon/Icon';
import { BsFillArrowLeftCircleFill } from 'react-icons/bs';
const AddCollectionModal = ({ handleModalClose }: IAddCollectionModalProps) => {
  const [steps, setSteps] = useState<Steps[]>([
    'General',
    'Network',
    'Royalties',
  ]);
  const [selected, setSelected] = useState<number>(0);

  const buttonLabel =
    steps[selected] === 'Royalties' ? 'Save collection' : 'Next Step';
  function handleSteps() {
    if (steps[selected] === 'Royalties') console.log('Save everything');
    else setSelected(selected + 1);
  }
  return (
    <Modal onClose={handleModalClose}>
      <div className={styles.column}>
        {steps[selected] !== 'General' && selected !== 0 && (
          <Icon
            onClick={() => setSelected(selected - 1)}
            className={styles.icon}
            icon={
              <BsFillArrowLeftCircleFill
                style={{ width: '30px', height: '30px' }}
              />
            }
          />
        )}

        {steps[selected] === 'General' && (
          <GeneralInformation handleSteps={() => setSelected(selected + 1)} />
        )}
        {steps[selected] === 'Network' && (
          <NetworkInformation handleSteps={() => setSelected(selected + 1)} />
        )}
        {steps[selected] === 'Royalties' && (
          <RoyaltiesInformation handleSteps={handleSteps} />
        )}

        <p>Contract address will go here as info for the user?</p>
      </div>
    </Modal>
  );
};

export default AddCollectionModal;
