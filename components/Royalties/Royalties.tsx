import React, { ChangeEvent, useState } from 'react';
import styles from './Royalties.module.scss';
import Input from '../ui/Input';
import { useStoreActions } from '../../store';
import { IRoyaltiesForm } from './Royalties.types';
import Icon from '../ui/Icon/Icon';
import { BsPlusCircleFill } from 'react-icons/bs';

const Royalties = () => {
  const addRoyalty = useStoreActions(
    (actions) => actions.collection.addRoyalty
  );

  const [formInput, setFormInput] = useState<IRoyaltiesForm>({
    walletAddress: '',
    percentage: '',
  });
  const handleForm = (e: ChangeEvent<Element>) => {
    setFormInput({
      ...formInput,
      [e.target.id]: (e.target as HTMLInputElement).value,
    });
  };
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
      />
      <div className={styles.percentage}>
        <Input
          inputType={'percentage'}
          title={'%'}
          placeholder={'Add Percentage'}
          value={formInput.percentage}
          handleChange={(e) =>
            setFormInput({
              ...formInput,
              percentage: (e.target as HTMLInputElement).value,
            })
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