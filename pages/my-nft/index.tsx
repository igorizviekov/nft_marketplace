import { NextPage } from 'next';
import { fetchContract } from '../../utils';
import { INftCardProps, NftCard } from '../../components/ui/nft-card';
import { useEffect, useState } from 'react';
import { useStoreRehydrated } from 'easy-peasy';
import { ethers } from 'ethers';
import axios from 'axios';
import { toast } from 'react-toastify';
import nftGuy from '../../assets/icons/my-nfts.json';
import Lottie from 'lottie-react';
import { useStoreState } from 'easy-peasy';
import { IStoreModel } from '../../store/model/model.types';
import { Button } from '../../components/ui/Button';
import { useRouter } from 'next/router';
import Web3Modal from 'web3modal';

const MyNFTs: NextPage = () => {
  const [nfts, setNfts] = useState<INftCardProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean | string>(false);

  const { activeWallet } = useStoreState((state: IStoreModel) => state.wallet);
  const userState = useStoreState((state: IStoreModel) => state.user);
  const walletState = useStoreState((state: IStoreModel) => state.wallet);
  const isRehydrated = useStoreRehydrated();
  const router = useRouter();

  const fetchMyNFTs = async (currency: string) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACK_API}/nft/contract?chain=${currency}`,
        {
          headers: {
            Authorization: `Bearer ${userState.token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      const { contractAddress, MarketAddressABI } = res.data.data;
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer, contractAddress, MarketAddressABI);
      /**
       * List of NFT that you own
       */
      const data = await contract.getMyCocktails();
      /**
       * Map data to the format, which will used on frontend
       */
      const items = await Promise.all(
        data.map(async ({ tokenId, seller, owner, price }: INftCardProps) => {
          const formattedPrice = ethers.utils.formatUnits(
            price.toString(),
            'ether'
          );
          const tokenURI: string = await contract.tokenURI(tokenId);

          // get NFT me tadata and image
          const res = await axios.get(tokenURI);

          return {
            ...res.data,
            price: formattedPrice,
            tokenId: Number(tokenId),
            seller,
            owner,
          };
        })
      );
      return items;
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchMyNFTs(walletState.currency)
      .then((items) => {
        if (items?.length) {
          setNfts(items);
        } else {
          setNfts([]);
        }
        setIsLoading(false);
      })
      .catch((e) => {
        console.log('failed to fetch NFT', e);
        setIsError(
          'Failed to fetch. Please ensure your wallet is connected to the Polygon network.'
        );
        setIsLoading(false);
      });
  }, [walletState.currency]);

  useEffect(() => {
    if (isError) {
      toast.error(isError);
    }
  }, [isError]);

  const content =
    !isLoading && !nfts.length ? (
      <>
        <h2 className="font-poppins dark:text-white text-nft-black-1 text-xl mt-5 font-semibold">
          You do not own any NFTs
        </h2>
        <div className="m-20">
          <Button
            label="Buy"
            isPrimary
            onClick={() => {
              router.push('/');
            }}
            classStyles="w-100"
          />
        </div>
      </>
    ) : (
      <div className="sm:px-4 p-12 w-full minmd:w-4/5 flexCenter flex-col">
        <div className="mt-3 w-full flex flex-wrap">
          {nfts.map((nft) => (
            <NftCard key={nft.tokenId} {...nft} />
          ))}
        </div>
      </div>
    );

  const nickname =
    (isRehydrated && userState?.name) ||
    `${activeWallet?.slice(0, 3)}...${activeWallet?.slice(
      activeWallet?.length - 5
    )}`;

  return (
    <div className="w-full flex justify-start items-center flex-col min-h-screen animate-fadeIn">
      <div className="w-full flexCenter flex-col">
        <div className="flexCenter mt-24 sm:flex-col">
          <Lottie animationData={nftGuy} loop={true} style={{ width: 250 }} />
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">
            {nickname}
          </p>
        </div>
      </div>
      {content}
    </div>
  );
};

export default MyNFTs;
