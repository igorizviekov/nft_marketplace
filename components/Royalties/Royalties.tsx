import React, { ChangeEvent, useState } from 'react';
import styles from './Royalties.module.scss';
import Input from '../ui/Input';
import { useStoreActions, useStoreState } from '../../store';
import { IRoyaltiesForm } from './Royalties.types';
import Icon from '../ui/Icon/Icon';
import { BsPlusCircleFill } from 'react-icons/bs';
import { isWalletValid, validatePercentage } from './utils';

const Royalties = () => {
  const addRoyalty = useStoreActions(
    (actions) => actions.collection.addRoyalty
  );

  const royaltyAddresses = useStoreState((state) => state.collection.royalties);

  const [formInput, setFormInput] = useState<IRoyaltiesForm>({
    walletAddress: '',
    percentage: '',
  });
  return (
    <div className={styles.container}>
      <Input
        inputType={'text'}
        title={'Royalties'}
        placeholder={'Add Royalties Address'}
        value={formInput.walletAddress}
        handleChange={(e) =>
          setFormInput({
            ...formInput,
            walletAddress: (e.target as HTMLInputElement).value,
          })
        }
        id={''}
        error={
          formInput.walletAddress &&
          isWalletValid(formInput.walletAddress, royaltyAddresses)
        }
      />
      <div className={styles.percentage}>
        <Input
          inputType={'percentage'}
          title={'Percentage'}
          placeholder={'Add Percentage'}
          value={formInput.percentage}
          handleChange={(e) =>
            setFormInput({
              ...formInput,
              percentage: (e.target as HTMLInputElement).value,
            })
          }
          error={
            formInput.percentage &&
            validatePercentage(Number(formInput.percentage))
          }
          id={''}
        />
        <Icon
          onClick={() =>
            addRoyalty({
              walletAddress: formInput.walletAddress,
              percentage: Number(formInput.percentage),
            })
          }
          className={styles.icon}
          icon={<BsPlusCircleFill style={{ width: '30px', height: '30px' }} />}
        />
      </div>
    </div>
  );
};

export default Royalties;
