import React from 'react';
import { Button } from '../../components/ui/Button';
import { IStepsProps } from './types';
import styles from './swap-page.module.scss';
const ConfirmedSwap = ({ setSteps }: IStepsProps) => (
  <div className={styles.swapSubPage}>
    <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">
      Congrats! Your swap was successfull
    </p>
    <div>
      <Button
        isPrimary={true}
        label={'Continue'}
        onClick={() => setSteps('WalletAddress')}
      />
    </div>
  </div>
);

export default ConfirmedSwap;
