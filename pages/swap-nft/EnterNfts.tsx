import React from 'react';
import AddNftCard from '../../components/ui/add-nft-card';
import { Button } from '../../components/ui/Button';
import { IStepsProps } from './types';
import styles from './swap-page.module.scss';

const EnterNFTS = ({ setSteps }: IStepsProps) => {
  return (
    <div className={styles.swapSubPage}>
      <p className="animated font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">
        Enter NFTS to Swap
      </p>

      <AddNftCard
        onClick={function (): void {
          throw new Error('Function not implemented.');
        }}
      />

      <div>
        <Button
          isPrimary={true}
          label={'Continue'}
          onClick={() => setSteps('ConfirmSwap')}
        />
      </div>
    </div>
  );
};

export default EnterNFTS;
