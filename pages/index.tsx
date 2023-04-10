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
import { useStoreState } from 'easy-peasy';
import { IStoreModel } from '../store/model/model.types';

export default function Home() {
  const [nftList, setNftList] = useState<INftCardProps[]>([]);
  const [nftsCopy, setNftsCopy] = useState<INftCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState<boolean | string>(true);
  const [activeSelect, setActiveSelect] =
    useState<ActiveSelectOption>('Recently added');

  const userState = useStoreState((state: IStoreModel) => state.user);

  const fetchNFTs = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACK_API}/nft/all?chain=MATIC`,
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
    console.log({ items });
    return items;
  };

  useEffect(() => {
    fetchNFTs()
      .then((items) => {
        if (items?.length) {
          const sortedNfts = sortNfts('Recently added', items);
          setNftList(sortedNfts);
          setNftsCopy(sortedNfts);
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
  }, []);

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
