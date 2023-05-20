import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { Spinner } from '../../components/spinner';
import { useStoreRehydrated } from 'easy-peasy';
import BasePage from '../../components/ui/Base/BasePage/BasePage';
import CreateNftForm from './CreateNftForm';
import { useStoreState } from '../../store';
import { useRouter } from 'next/router';

export interface IFormInput {
  price: string;
  name: string;
  description: string;
}

const CreateNFT: NextPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isWalletConnected } = useStoreState((state) => state.wallet);
  const router = useRouter();

  const isRehydrated = useStoreRehydrated();

  useEffect(() => {
    if (!isWalletConnected) router.push('/');
  }, []);

  return isLoading || !isRehydrated || !isWalletConnected ? (
    <Spinner />
  ) : (
    <BasePage>
      <CreateNftForm />
    </BasePage>
  );
};

export default CreateNFT;
