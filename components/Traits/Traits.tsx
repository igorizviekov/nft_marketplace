import React, { useState } from 'react';
import styles from './Traits.module.scss';
import Input from '../ui/Input';
import { ITraitForm, ITraitProps } from './Traits.types';
import Icon from '../ui/Icon/Icon';
import { BsPlusCircleFill } from 'react-icons/bs';
import classNames from 'classnames';

const Traits = ({
  addTrait,
  traitError,
  setFormError,
  traits,
}: ITraitProps) => {
  const [formInput, setFormInput] = useState<ITraitForm>({
    traitType: '',
    value: '',
  });
  return (
    <div className={styles.container}>
      <Input
        inputType={'text'}
        title={'Trait (Optional)'}
        placeholder={'Add Trait Type'}
        value={formInput.traitType}
        handleChange={(e) =>
          setFormInput({
            ...formInput,
            traitType: (e.target as HTMLInputElement).value,
          })
        }
        id={''}
      />
      <div className={styles.percentage}>
        <Input
          inputType={'text'}
          title={'Value (Optional)'}
          placeholder={'Add Trait Value'}
          value={formInput.value}
          handleChange={(e) =>
            setFormInput({
              ...formInput,
              value: (e.target as HTMLInputElement).value,
            })
          }
          id={''}
        />
        <Icon
          onClick={() =>
            addTrait({
              traitType: formInput.traitType,
              value: formInput.value,
            })
          }
          className={classNames(styles.icon, traitError && styles.error)}
          icon={<BsPlusCircleFill style={{ width: '30px', height: '30px' }} />}
        />
      </div>
    </div>
  );
};

export default Traits;
