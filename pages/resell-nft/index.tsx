import { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Spinner } from '../../components/spinner';
import Input from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { toast } from 'react-toastify';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import { fetchContract } from '../../utils';
import axios from 'axios';
import { useStoreState } from 'easy-peasy';
import { IStoreModel } from '../../store/model/model.types';

const ReSellNFT = () => {
  const router = useRouter();
  const [price, setPrice] = useState('');
  const { image, tokenId } = router.query;
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState<boolean | string>(false);
  const [nftCurr, setNftCurr] = useState('');

  const userState = useStoreState((state: IStoreModel) => state.user);
  const walletState = useStoreState((state: IStoreModel) => state.wallet);

  const listOnMarketPlace = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACK_API}/nft/contract?chain=${walletState.currency}`,
        {
          headers: {
            Authorization: `Bearer ${userState.token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      // https://www.npmjs.com/package/web3modal
      const we3Modal = new Web3Modal();
      const connection = await we3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);

      const { MarketAddress, MarketAddressABI } = res.data.data;
      /**
       * Person who is re-selling an NFT
       */
      const signer = provider.getSigner();
      /**
       * Get access to the Solidity Smart Contract api
       */
      const contract = fetchContract(signer, MarketAddress, MarketAddressABI);
      /**
       * Convert price value from the form input to the blockchain readable format
       */
      const formattedPrice = ethers.utils.parseUnits(price, 'ether');
      const listingPrice = await contract.getListingPrice();

      const transaction = await contract.resellToken(tokenId, formattedPrice, {
        value: listingPrice,
      });

      // should trigger metamask popup
      await transaction.wait();
    } catch (e) {
      console.log(e);
    }
  };

  const handleResell = async () => {
    if (!price.length || Number.isNaN(price) || !image?.length || !tokenId) {
      return setIsError('Please provide valid data');
    }
    if (nftCurr !== walletState.currency) {
      return setIsError(
        'Please switch to the original blockchain to list an NFT'
      );
    }
    setIsLoading(true);
    try {
      await listOnMarketPlace();
      toast.success('You successfully listed your NFT on a Marketplace');
      setTimeout(() => router.push('/'), 2000);
    } catch (e) {
      console.log('Failed to list NFT on a Marketplace', e);
      setIsError('Failed to list NFT on a Marketplace');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (router.isReady) {
      const { price } = router.query;
      if (price && image) {
        setPrice(price as string);
      }
      setIsLoading(false);
    }
  }, [router.isReady]);

  useEffect(() => {
    if (isError) {
      toast.error(isError);
    }
  }, [isError]);

  useEffect(() => {
    setNftCurr(walletState.currency);
  }, []);

  const content = isLoading ? (
    <Spinner styles="min-h-screen flexCenter animate-fadeIn" />
  ) : image ? (
    <div className="flex justify-center sm:px-4 p-12 pt-28">
      <div className="w-1/3 sm:w-full md:min-h-screen">
        <h1 className="font-poppins dark:text-white text-nft-black-1 font-semibold text-2xl">
          Resell Your NFT
        </h1>
        <Input
          inputType="number"
          title="Price"
          placeholder="NFT Price"
          handleClick={(e) => setPrice((e.target as HTMLInputElement).value)}
          value={price}
        />
        <img
          src={image as string}
          className="rounded mt-4"
          width={350}
          alt="NFT"
        />
        <div className="mt-7 w-full flex">
          <Button
            label="List NFT"
            classStyles="rounded-xl"
            onClick={handleResell}
            isPrimary
          />
        </div>
      </div>
    </div>
  ) : (
    <div className="min-h-screen">Oops...</div>
  );
  return content;
};

export default ReSellNFT;
