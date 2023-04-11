import { NftList } from '../components/nft-list';
import { TopSellers } from '../components/top-sellers';
import { Banner } from '../components/ui/banner/banner';
import { INftCardProps } from '../components/ui/nft-card';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';
import { toast } from 'react-toastify';
import { fetchContract, getTopCreators, sortNfts } from '../utils';
import { ActiveSelectOption } from '../components/search-filter/search-filter.types';
import { Actions, useStoreActions, useStoreState } from 'easy-peasy';
import { IStoreModel } from '../store/model/model.types';

export default function Home() {
  const [nftList, setNftList] = useState<INftCardProps[]>([]);
  const [nftsCopy, setNftsCopy] = useState<INftCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState<boolean | string>(true);
  const [activeSelect, setActiveSelect] =
    useState<ActiveSelectOption>('Recently added');

  const userState = useStoreState((state: IStoreModel) => state.user);

  const walletState = useStoreState((state: IStoreModel) => state.wallet);
  const uiActions = useStoreActions(
    (actions: Actions<IStoreModel>) => actions.ui
  );

  const fetchNFTs = async (currency: string) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACK_API}/nft/all?chain=${currency}`,
        {
          headers: {
            Authorization: `Bearer ${userState.token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      const {
        data: { items },
      } = res.data;
      return items;
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    uiActions.toggleLoading(true);
    setIsLoading(true);
    fetchNFTs(walletState.currency)
      .then((items) => {
        if (items?.length) {
          const sortedNfts = sortNfts('Recently added', items);
          setNftList(sortedNfts);
          setNftsCopy(sortedNfts);
        } else {
          setNftList([]);
          setNftsCopy([]);
        }
        setIsLoading(false);
        uiActions.toggleLoading(false);
      })
      .catch((e) => {
        console.log('failed to fetch NFT', e);
        setIsError(e.message);
        setIsLoading(false);
        uiActions.toggleLoading(false);
      });
  }, [walletState.currency]);

  useEffect(() => {
    if (isError) {
      toast.error(isError);
    }
  }, [isError]);

  // dropdown filter
  useEffect(() => {
    setNftList(sortNfts(activeSelect, [...nftList]));
  }, [activeSelect]);

  // search
  const onHandleSearch = (value: string) => {
    const filteredNfts = nftList.filter(
      (nft) =>
        nft.metadata?.name &&
        nft.metadata?.name.toLowerCase().includes(value.toLowerCase())
    );

    if (filteredNfts.length) {
      setNftList(filteredNfts);
    } else {
      setNftList(nftsCopy);
    }
  };

  const onClearSearch = () => {
    if (nftList.length && nftsCopy.length) {
      setNftList(nftsCopy);
    }
  };

  return (
    <div className="pt-32 sm:pt-26  w-9/12  sm:w-full m-auto animate-fadeIn">
      <Banner />
      <TopSellers creators={getTopCreators(nftsCopy)} />
      <NftList
        nfts={nftList}
        isLoading={isLoading}
        searchProps={{
          onClearSearch,
          onHandleSearch,
          setActiveSelect,
          activeSelect,
        }}
      />
    </div>
  );
}
