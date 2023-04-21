import { NextPage } from 'next';
import React, { useState } from 'react';
import { Spinner } from '../../components/spinner';
import { useStoreRehydrated } from 'easy-peasy';
import BasePage from '../../components/ui/Base/BasePage/BasePage';
import CreateNftForm from './CreateNftForm';

export interface IFormInput {
  price: string;
  name: string;
  description: string;
}

const CreateNFT: NextPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isRehydrated = useStoreRehydrated();

  return isLoading || !isRehydrated ? (
    <Spinner styles="min-h-screen flexCenter animate-fadeIn" />
  ) : (
    <BasePage>
      <CreateNftForm />
    </BasePage>
  );
};

export default CreateNFT;
