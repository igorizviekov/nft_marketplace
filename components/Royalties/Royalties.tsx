import React from 'react';
import styles from './Royalties.module.scss';
import Input from '../ui/Input';
import { Button } from '../ui/Button';
const Royalties = () => {
  return (
    <div className={styles.container}>
      <Input
        inputType={'text'}
        title={'Royalties'}
        placeholder={'Add Royalties Address'}
        id={''}
      />
      <Input
        inputType={'text'}
        title={'Percentage'}
        placeholder={'Add Royalties Percentage'}
        id={''}
      />
      <Button
        isPrimary={true}
        label={'Add'}
        onClick={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
    </div>
  );
};

export default Royalties;
