import React, { useEffect } from 'react';
import { getMarketplaceContract } from '../collection/utilts';
import { ethers } from 'ethers';

export interface IListing {
  collection: string;
  tokenId: number;
  price: number;
  seller: string;
}

const getListingsBySeller = (seller: string) => {
  useEffect(() => {
    const getListings = async () => {
      const marketplaceContract = await getMarketplaceContract();
      const listings = await marketplaceContract.getListingsBySeller(seller, 1);

      const proceedListings = listings.map((listing: IListing) => ({
        tokenId: Number(listing.tokenId),
        price: ethers.utils.formatUnits(listing.price.toString(), 'ether'),
        seller: listing.seller,
        collection: listing.collection,
      }));
      console.log(proceedListings);
    };
    try {
      getListings();
    } catch (err) {
      console.log(err);
    }
  }, []);
};

export default getListingsBySeller;
