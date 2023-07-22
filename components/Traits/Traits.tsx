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
    trait_type: '',
    value: '',
  });

  useEffect(() => {
    const isDuplicate = traits.some(
      (trait) =>
        trait.trait_type === formInput.trait_type &&
        trait.value === formInput.value
    );
    if (isDuplicate) {
      setFormError(true);
      setError('Trait is duplicate');
    } else if (
      traits.length === 0 &&
      (formInput.trait_type === '' || formInput.value === '')
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
            value={formInput.trait_type}
            handleChange={(e) =>
              setFormInput({
                ...formInput,
                trait_type: (e.target as HTMLInputElement).value,
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
            onClick={() => {
              addTrait({
                trait_type: formInput.trait_type,
                value: formInput.value,
              });
              setFormInput({
                trait_type: '',
                value: '',
              });
            }}
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
