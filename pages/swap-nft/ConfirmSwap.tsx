import React from 'react';
import { Button } from '../../components/ui/Button';
import { NftCard } from '../../components/ui/nft-card';
import { IStepsProps } from '.';
import styles from '../../styles/pages/swap-page.module.scss';

const ConfirmSwap = ({ setSteps }: IStepsProps) => {
  return (
    <div className={styles.swapSubPage}>
      <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">
        Review and Confirm Swap
      </p>
      <div className="flex gap-2">
        <div className="flex w-full">{/* //@TODO Add nfts */}</div>
      </div>
      <div className="flex flex-col items-center text-center gap-1">
        <p>
          By confirming the swap you confirm the deployment of the smart
          contract and will transfer assets and payment ready for swap
          confirmation and execution. You may cancel this contract at any time
          before the swap has been confirmed.
        </p>
        <Button
          isPrimary={true}
          label={'Continue'}
          onClick={() => setSteps('Confirmed')}
        />
      </div>
    </div>
  );
};

export default ConfirmSwap;
