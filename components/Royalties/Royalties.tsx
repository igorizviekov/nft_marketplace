import React, { useState } from 'react';
import styles from './Royalties.module.scss';
import Input from '../ui/Input';
import { IRoyaltiesForm, IRoyaltiesProps } from './Royalties.types';
import Icon from '../ui/Icon/Icon';
import { BsPlusCircleFill } from 'react-icons/bs';
import { isWalletValid, validatePercentage, validateRoyalties } from './utils';
import classNames from 'classnames';

const Royalties = ({
  royalties,
  addRoyalty,
  royaltiesError,
  setFormError,
}: IRoyaltiesProps) => {
  const [formInput, setFormInput] = useState<IRoyaltiesForm>({
    walletAddress: '',
    percentage: undefined,
  });

  const errorMessage = validateRoyalties(
    Number(formInput.percentage),
    formInput.walletAddress,
    royalties,
    setFormError
  );
  return (
    <div className={styles.container}>
      <div className={styles.upperContainer}>
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
          error={errorMessage.walletMessage}
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
            error={errorMessage.percentageMessage}
            id={''}
          />
        </div>
      </div>
      <div
        className={classNames(styles.addButton, royaltiesError && styles.error)}
        onClick={() => {
          addRoyalty({
            walletAddress: formInput.walletAddress,
            percentage: Number(formInput.percentage),
          });
          setFormInput({
            walletAddress: '',
            percentage: '',
          });
        }}
      >
        <p>Add Royalty</p>
        <Icon
          className={styles.icon}
          icon={<BsPlusCircleFill style={{ width: '30px', height: '30px' }} />}
        />
      </div>
    </div>
  );
};

export default Royalties;
