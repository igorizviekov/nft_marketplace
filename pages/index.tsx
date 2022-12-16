import { NftList } from '../components/nft-list';
import { TopSellers } from '../components/top-sellers';
import { Banner } from '../components/ui/banner/banner';
import { INftCardProps, NftCard } from '../components/ui/nft-card';
import { useEffect, useState } from 'react';
import { Search } from '../components/search';
import { ethers } from 'ethers';
import axios from 'axios';
import { toast } from 'react-toastify';
import { fetchContract, getTopCreators } from '../utils';

export default function Home() {
  const [nftList, setNftList] = useState<INftCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState<boolean | string>(true);

  const fetchNFTs = async () => {
    const provider = new ethers.providers.JsonRpcProvider();
    const contract = fetchContract(provider);
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
    fetchNFTs()
      .then((items) => {
        if (items?.length) {
          setNftList(items);
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

  return (
    <div className="pt-32 sm:pt-26  w-9/12  sm:w-full m-auto">
      <Banner />
      <TopSellers creators={getTopCreators(nftList)} />
      <NftList nfts={nftList} isLoading={isLoading} />
    </div>
  );
}
