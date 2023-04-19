import { NextPage } from 'next';
import React, { useState } from 'react';
import { Spinner } from '../../components/spinner';
import { useStoreRehydrated } from 'easy-peasy';
import BasePage from '../../components/ui/Base/BasePage/BasePage';
import CreateNftCard from '../../components/ui/CreateNftCard/CreateNftCard';
import CreateSingleForm from './CreateSingleForm';
import CreateCollectionFrom from './CreateCollectionFrom';

export interface IFormInput {
  price: string;
  name: string;
  description: string;
}

const CreateNFT: NextPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [openSingle, setOpenSingle] = useState<boolean>(false);
  const [openCollection, setOpenCollection] = useState<boolean>(false);
  const isRehydrated = useStoreRehydrated();

  function handleSingleClick() {
    setOpenSingle(true);
    setOpenCollection(false);
  }
  function handleCollectionClick() {
    setOpenSingle(false);
    setOpenCollection(true);
  }
  return isLoading || !isRehydrated ? (
    <Spinner styles="min-h-screen flexCenter animate-fadeIn" />
  ) : (
    <BasePage>
      <CreateNftCard
        onSingleClick={handleSingleClick}
        onCollectionClick={handleCollectionClick}
      />

      {openSingle && <CreateSingleForm />}
      {openCollection && <CreateCollectionFrom />}
    </BasePage>
  );
};

export default CreateNFT;
