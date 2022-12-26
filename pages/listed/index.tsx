import axios from 'axios';
import { ethers } from 'ethers';
import { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { Spinner } from '../../components/spinner';
import { INftCardProps, NftCard } from '../../components/ui/nft-card';
import { fetchContract } from '../../utils';
import Web3Modal from 'web3modal';
import { toast } from 'react-toastify';
import listedAnimation from '../../assets/icons/listed.json';
import Lottie from 'lottie-react';

const ListedNFTs: NextPage = () => {
  const [nfts, setNfts] = useState<INftCardProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean | string>(false);

  /**
   * Get NFTs which are listed by your wallet on a marketplace
   */
  const fetchListedNFTs = async () => {
    // https://www.npmjs.com/package/web3modal
    const we3Modal = new Web3Modal();
    const connection = await we3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);

    /**
     * Person who is creating an NFT
     */
    const signer = provider.getSigner();
    /**
     * Get access to the Solidity Smart Contract api
     */
    const contract = fetchContract(signer);
    const data = await contract.getMyCocktailsListed();

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
    fetchListedNFTs()
      .then((items) => {
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

  let content = <Spinner styles="min-h-screen flexCenter animate-fadeIn" />;

  if (!isLoading && nfts.length === 0) {
    content = (
      <div className="flexCenter sm:p-4 p-16 min-h-screen">
        <h1 className="font-poppins dark:text-white text-nft-black-1 text-3xl font-extrabold">
          No NFTs Listed for Sale
        </h1>
      </div>
    );
  }

  if (!isLoading && nfts.length) {
    content = (
      <div className="flex justify-center sm:px-4 p-12 min-h-screen">
        <div className="w-full minmd:w-4/5">
          <div className="mt-24">
            <h2 className="font-poppins dark:text-white text-nft-black-1 text-2xl font-semibold mt-2 ml-4 sm:ml-2 sm:text-center">
              Your NFTs Listed for Sale
            </h2>
            <div className="mt-3 w-full flex flex-wrap justify-start md:justify-center">
              {nfts.map((nft) => (
                <NftCard key={nft.tokenId} {...nft} />
              ))}
            </div>
            <div className="w-full flexCenter mt-20">
              <Lottie
                animationData={listedAnimation}
                loop={true}
                style={{ width: 250 }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
  return content;
};

export default ListedNFTs;
