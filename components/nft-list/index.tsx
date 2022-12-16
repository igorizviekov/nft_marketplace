import { fetchContract } from '../../utils';
import { INftCardProps, NftCard } from '../ui/nft-card';
import { useEffect, useState } from 'react';
import { Search } from '../search';
import { ethers } from 'ethers';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Spinner } from '../spinner';

interface INFTListProps {
  nfts: INftCardProps[];
  isLoading: boolean;
}

export const NftList = ({ isLoading, nfts }: INFTListProps) => (
  <div className="mb-12">
    <div className="w-full flex flex-wrap justify-start md:justify-center ">
      {isLoading ? (
        <Spinner styles="min-h-screen w-full mt-20 animate-fadeIn" />
      ) : !isLoading && !nfts.length ? (
        <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold my-5 px-5 sm:text-center">
          No NFTs Listed for Sale
        </h1>
      ) : (
        <>
          <div className="w-full flex justify-between flex-center  animate-fadeIn sm:flex-col">
            <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold my-5 px-5 sm:text-center">
              Trending NFTs
            </h1>
            <Search />
          </div>
          {nfts.map((nft, i) => (
            <NftCard key={nft.owner + i} {...nft} />
          ))}
        </>
      )}
    </div>
  </div>
);
