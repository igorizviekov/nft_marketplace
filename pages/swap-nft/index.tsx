import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { NftCard } from '../../components/ui/nft-card';

type Steps = 'WalletAddress' | 'EnterNFTS' | 'ConfirmSwap' | 'Confirmed';
const SwapPage = () => {
  const [steps, setSteps] = useState<Steps>('WalletAddress');
  const WalletAddress = (
    <div className="flex flex-col justify-center sm:px-4 p-12 pt-28">
      <p className="flex-1 font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">
        Swap NFT's
      </p>
      <Input
        title={'Wallet address'}
        inputType={'input'}
        placeholder={'Enter the wallet address you wish to swap with'}
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

  const enterNFTS = (
    <div className="flex flex-col justify-center sm:px-4 p-12 pt-28">
      <p className="flex-1 font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">
        Enter NFTS to Swap
      </p>

      <div className="flex w-full">
        <NftCard
          name={'Mock NFT'}
          seller={'Any seller'}
          owner={'Owner'}
          description={'Descriptiion'}
          img={''}
          price={12}
          tokenId={0}
        />
        <NftCard
          name={'Mock NFT'}
          seller={'Any seller'}
          owner={'Owner'}
          description={'Descriptiion'}
          img={''}
          price={12}
          tokenId={0}
        />
      </div>
      <div>
        <Button
          isPrimary={true}
          label={'Continue'}
          onClick={() => setSteps('ConfirmSwap')}
        />
      </div>
    </div>
  );

  const confirmSwap = (
    <div className="flex flex-col justify-center sm:px-4 p-12 pt-28">
      <p className="flex-1 font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">
        Review and Confirm Swap
      </p>
      <div className="flex gap-2">
        <div className="flex w-full">
          <NftCard
            name={'Mock NFT'}
            seller={'Any seller'}
            owner={'Owner'}
            description={'Descriptiion'}
            img={''}
            price={12}
            tokenId={0}
          />
          <NftCard
            name={'Mock NFT'}
            seller={'Any seller'}
            owner={'Owner'}
            description={'Descriptiion'}
            img={''}
            price={12}
            tokenId={0}
          />
        </div>{' '}
        <div className="flex w-full">
          <NftCard
            name={'Mock NFT'}
            seller={'Any seller'}
            owner={'Owner'}
            description={'Descriptiion'}
            img={''}
            price={12}
            tokenId={0}
          />
          <NftCard
            name={'Mock NFT'}
            seller={'Any seller'}
            owner={'Owner'}
            description={'Descriptiion'}
            img={''}
            price={12}
            tokenId={0}
          />
        </div>
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

  const confirmed = (
    <div className="flex flex-col justify-center sm:px-4 p-12 pt-28">
      <p className="flex-1 font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">
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
  return steps === 'WalletAddress'
    ? WalletAddress
    : steps === 'EnterNFTS'
    ? enterNFTS
    : steps === 'ConfirmSwap'
    ? confirmSwap
    : confirmed;
};

export default SwapPage;
