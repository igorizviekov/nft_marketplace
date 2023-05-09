import React, { useState } from 'react';
import styles from './Royalties.module.scss';
import Input from '../ui/Input';
import { IRoyaltiesForm, IRoyaltiesProps } from './Royalties.types';
import Icon from '../ui/Icon/Icon';
import { BsPlusCircleFill } from 'react-icons/bs';
import { isWalletValid, validatePercentage } from './utils';
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

  console.log('royalties eerrroo', royaltiesError);
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
        error={isWalletValid(formInput.walletAddress, royalties, setFormError)}
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
          error={validatePercentage(Number(formInput.percentage), setFormError)}
          id={''}
        />
        <Icon
          onClick={() =>
            addRoyalty({
              walletAddress: formInput.walletAddress,
              percentage: Number(formInput.percentage),
            })
          }
          className={classNames(styles.icon, royaltiesError && styles.error)}
          icon={<BsPlusCircleFill style={{ width: '30px', height: '30px' }} />}
        />
      </div>
    </div>
  );
};

export default Royalties;
