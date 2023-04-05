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

export default function Home() {
  const [nftList, setNftList] = useState<INftCardProps[]>([]);
  const [nftsCopy, setNftsCopy] = useState<INftCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState<boolean | string>(true);
  const [activeSelect, setActiveSelect] =
    useState<ActiveSelectOption>('Recently added');

  const fetchNFTs = async () => {
    const provider = new ethers.providers.JsonRpcProvider();
    // process.env.NEXT_PUBLIC_ALCHEMY_API_URL
    const contract = fetchContract(provider);
    // console.log({ deployed: contract });
    /**
     * List of all available NFTs on marketplace.
     * Filtered by "not sold"
     */
    const data = await contract.getActiveCocktails();
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
        const { data } = await axios.get(tokenURI);

        return {
          price: formattedPrice,
          tokenId: Number(tokenId),
          seller,
          owner,
          ...data,
        };
      })
    );
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
      (nft) => nft.name && nft.name.toLowerCase().includes(value.toLowerCase())
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
