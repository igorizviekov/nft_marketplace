import React, { useState } from 'react';
import styles from './AddCollectionModal.module.scss';
import { IAddCollectionModalProps, Steps } from './AddCollectionModal.types';
import { Modal } from '../modal';
import GeneralInformation from './GeneralInformation';
import NetworkInformation from './NetworkInformation';
import RoyaltiesInformation from './RoyaltiesInformation';
import Icon from '../ui/Icon/Icon';
import { BsFillArrowLeftCircleFill } from 'react-icons/bs';
import ConfirmationInformation from './ConfirmationInformation';
import { useStoreActions } from '../../store';

const AddCollectionModal = ({ handleModalClose }: IAddCollectionModalProps) => {
  const steps: Steps[] = ['General', 'Network', 'Royalties', 'Confirmation'];

  const [selected, setSelected] = useState<number>(0);

  function handleSteps() {
    if (steps[selected] === 'Confirmation') console.log('Save everything');
    else setSelected(selected + 1);
  }
  const {} = useStoreActions((actions) => actions.createCollection);
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
        {steps[selected] === 'Confirmation' && (
          <ConfirmationInformation handleModalClose={handleModalClose} />
        )}
        <p>Contract address will go here as info for the user?</p>
      </div>
    </Modal>
  );
};

export default AddCollectionModal;
