import React, { useEffect, useState } from 'react';
import styles from './Traits.module.scss';
import Input from '../ui/Input';
import { ITraitForm, ITraitProps } from './Traits.types';
import Icon from '../ui/Icon/Icon';
import { BsPlusCircleFill } from 'react-icons/bs';
import classNames from 'classnames';
import { useStoreState } from '../../store';

const Traits = ({
  addTrait,
  traitError,
  setFormError,
  leftLabel,
  rightLabel,
  leftPlaceholder,
  rightPlaceholder,
  isTrait,
}: ITraitProps) => {
  const { traits } = useStoreState((state) => state.nftMint);
  const [error, setError] = useState<string>('');
  const [formInput, setFormInput] = useState<ITraitForm>({
    traitType: '',
    value: '',
  });

  useEffect(() => {
    const isDuplicate = traits.some(
      (trait) =>
        trait.traitType === formInput.traitType &&
        trait.value === formInput.value
    );
    if (isDuplicate) {
      setFormError(true);
      setError('Trait is duplicate');
    } else if (
      traits.length === 0 &&
      (formInput.traitType === '' || formInput.value === '')
    ) {
      setFormError(true);
      setError('');
    } else {
      setError('');
      setFormError(false);
    }
  }, [traits, formInput]);

  return (
    <div className={styles.container}>
      <div className={styles.upperContainer}>
        <div className={classNames(styles.trait)}>
          <Input
            inputType={'text'}
            title={leftLabel}
            placeholder={leftPlaceholder}
            value={formInput.traitType}
            handleChange={(e) =>
              setFormInput({
                ...formInput,
                traitType: (e.target as HTMLInputElement).value,
              })
            }
            error={error}
            id={''}
          />
        </div>
        <div className={styles.value}>
          <Input
            inputType={'text'}
            title={rightLabel}
            placeholder={rightPlaceholder}
            value={formInput.value}
            handleChange={(e) =>
              setFormInput({
                ...formInput,
                value: (e.target as HTMLInputElement).value,
              })
            }
            id={''}
          />
        </div>
      </div>
      {isTrait && (
        <div
          className={classNames(styles.addButton, traitError && styles.error)}
        >
          <p>Add Trait</p>
          <Icon
            onClick={() =>
              addTrait({
                traitType: formInput.traitType,
                value: formInput.value,
              })
            }
            icon={
              <BsPlusCircleFill style={{ width: '30px', height: '30px' }} />
            }
          />
        </div>
      )}
    </div>
  );
};

export default Traits;
