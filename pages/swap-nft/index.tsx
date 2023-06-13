import React, { useState } from 'react';
import ConfirmedSwap from './ConfirmedSwap';
import ConfirmSwap from './ConfirmSwap';
import EnterNFTS from './EnterNfts';
import WalletAddress from './WalletAddress';
import styles from '../../styles/pages/swap-page.module.scss';
import BasePage from '../../components/ui/Base/BasePage/BasePage';
export interface IStepsProps {
  setSteps: (steps: Steps) => void;
}

export type Steps = 'WalletAddress' | 'EnterNFTS' | 'ConfirmSwap' | 'Confirmed';

const SwapPage = () => {
  const [steps, setSteps] = useState<Steps>('WalletAddress');

  const Progress = () => {
    const progress =
      steps === 'WalletAddress'
        ? styles.progress0
        : steps === 'EnterNFTS'
        ? styles.progress33
        : steps === 'ConfirmSwap'
        ? styles.progress67
        : styles.progress100;
    return (
      <div className={styles.container}>
        <div className={progress} />
        <div className={styles.walletAddress}>
          <p className={styles.text}>Enter wallet address</p>
        </div>
        <div className={styles.enterNFTS}>
          <p className={styles.text}>Confirm assets TO SEND</p>
        </div>
        <div className={styles.confirmSwap}>
          <p className={styles.text}>Confirm assets TO RECEIVE</p>
        </div>
        <div className={styles.confirmedSwap}>
          <p className={styles.text}>Review & Confirm</p>
        </div>
      </div>
    );
  };
  return (
    <BasePage>
      {steps === 'WalletAddress' ? (
        <WalletAddress setSteps={setSteps} />
      ) : steps === 'EnterNFTS' ? (
        <EnterNFTS setSteps={setSteps} />
      ) : steps === 'ConfirmSwap' ? (
        <ConfirmSwap setSteps={setSteps} />
      ) : (
        <ConfirmedSwap setSteps={setSteps} />
      )}
      <Progress />
    </BasePage>
  );
};

export default SwapPage;
