import { fetchContract } from '../../utils';
import { INftCardProps, NftCard } from '../ui/nft-card';
import { useEffect, useState } from 'react';
import { Search } from '../search';
import { ethers } from 'ethers';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Spinner } from '../spinner';

export const NftList = () => {
  const [nftList, setNftList] = useState<INftCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState<boolean | string>(false);

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

  const content = isLoading ? (
    <Spinner styles="min-h-screen w-full mt-20 animate-fadeIn" />
  ) : !isLoading && !nftList.length ? (
    <h2 className="font-poppins dark:text-white text-nft-black-1 text-l ml-5 font-semibold">
      No NFTs Listed for Sale
    </h2>
  ) : (
    <>
      <div className="w-full flex justify-between flex-center  animate-fadeIn sm:flex-col">
        <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold my-5 px-5 sm:text-center">
          Trending NFTs
        </h1>
        <Search />
      </div>
      {nftList.map((nft, i) => (
        <NftCard key={nft.owner + i} {...nft} />
      ))}
    </>
  );

  return (
    <div className="mb-12">
      <div className="w-full flex flex-wrap justify-start md:justify-center ">
        {content}
      </div>
    </div>
  );
};
