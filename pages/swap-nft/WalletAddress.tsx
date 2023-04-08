import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';

import Input from '../../components/ui/Input';
import { IStepsProps } from './types';
import styles from './swap-page.module.scss';

const WalletAddress = ({ setSteps }: IStepsProps) => {
  const [swapAddress, setSwapAddress] = useState<string>();

  return (
    <div className={styles.swapSubPage}>
      <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">
        Swap NFT's
      </p>
      <Input
        title={'Wallet address'}
        inputType={'text'}
        placeholder={'Enter the wallet address you wish to swap with'}
        value={swapAddress}
        handleClick={(e) =>
          setSwapAddress((e.target as HTMLInputElement).value)
        }
      />
      <div>
        <Button
          isPrimary={true}
          label={'Continue'}
          onClick={() => setSteps('EnterNFTS')}
        />
      </div>
    </div>
  );
};

export default WalletAddress;
