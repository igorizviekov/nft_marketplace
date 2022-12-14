import { NextPage } from 'next';
import { fetchContract } from '../../utils';
import { INftCardProps, NftCard } from '../../components/ui/nft-card';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Spinner } from '../../components/spinner';
import metaMaskIcon from '../../assets/icons/metamask-icon.json';
import Lottie from 'lottie-react';
import { Actions, useStoreActions, useStoreState } from 'easy-peasy';
import { IStoreModel } from '../../store/model/model.types';
import { Button } from '../../components/ui/Button';
import { useRouter } from 'next/router';

const MyNFTs: NextPage = () => {
  const [nfts, setNfts] = useState<INftCardProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean | string>(false);

  const { activeWallet } = useStoreState((state: IStoreModel) => state.wallet);
  const { toggleTab } = useStoreActions(
    (actions: Actions<IStoreModel>) => actions.ui
  );
  const router = useRouter();

  const fetchMyNFTs = async () => {
    const provider = new ethers.providers.JsonRpcProvider();
    const contract = fetchContract(provider);
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

        // get NFT metadata and image
        const {
          data: { image, name, description },
        } = await axios.get(tokenURI);

        return {
          price: formattedPrice,
          tokenId: Number(tokenId),
          img: image,
          seller,
          owner,
          name,
          description,
        };
      })
    );
    return items;
  };

  useEffect(() => {
    fetchMyNFTs()
      .then((items) => {
        console.log(items);
        if (items?.length) {
          setNfts(items);
        }
        setIsLoading(false);
      })
      .catch((e) => {
        console.log('failed to fetch NFT', e);
        setIsError('Failed to fetch NFT');
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (isError) {
      toast.error(isError);
    }
  }, [isError]);

  const content =
    !isLoading && !nfts.length ? (
      <>
        <h2 className="font-poppins dark:text-white text-nft-black-1 text-xl mt-5 font-semibold">
          You do not own and NFTs
        </h2>
        <div className="w-1/2">
          <Button
            label="Buy"
            isPrimary
            onClick={() => {
              toggleTab('Explore');
              router.push('/');
            }}
            classStyles="w-100"
          />
        </div>
      </>
    ) : (
      <div className="sm:px-4 p-12 w-full minmd:w-4/5 flexCenter flex-col">
        <div className="flex-1 w-full flex flex-row sm:flex-col px-4 xs:px-0 minlg:px-8">
          {/* <SearchBar
        activeSelect={activeSelect}
        setActiveSelect={setActiveSelect}
        handleSearch={onHandleSearch}
        clearSearch={onClearSearch}
      /> */}
        </div>
        <div className="mt-3 w-full flex flex-wrap">
          {nfts.map((nft) => (
            <NftCard key={nft.tokenId} {...nft} />
          ))}
        </div>
      </div>
    );

  return (
    <div className="w-full flex justify-start items-center flex-col min-h-screen">
      <div className="w-full flexCenter flex-col">
        <Spinner styles="mt-26 " />
        <div className="flexCenter flex-col -mt-20 z-0">
          <Lottie
            animationData={metaMaskIcon}
            loop={false}
            style={{ width: 180 }}
          />
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl mt-6">
            {activeWallet.slice(0, 3)}...$
            {activeWallet.slice(activeWallet.length - 5)}
          </p>
        </div>
      </div>

      {content}
    </div>
  );
};

export default MyNFTs;
