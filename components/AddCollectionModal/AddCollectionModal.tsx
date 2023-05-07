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
  function handleClick() {
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

        {steps[selected] === 'General' && <GeneralInformation />}
        {steps[selected] === 'Network' && <NetworkInformation />}
        {steps[selected] === 'Royalties' && <RoyaltiesInformation />}

        <p>Contract address will go here as info for the user?</p>

        <Button isPrimary={false} label={buttonLabel} onClick={handleClick} />
      </div>
    </Modal>
  );
};

export default AddCollectionModal;
