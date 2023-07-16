import axios from 'axios';
import { useEffect } from 'react';
import { useStoreActions, useStoreState } from '../store';
import { Alchemy, Network, OwnedNft } from 'alchemy-sdk';
import useGetNFTsInCollection from './collection/useGetNFTsInCollection';
import { IShimmerNFT } from '../components/ui/NFTCard/ShimmerNFTCard.types';

export const useFetchNFTS = (address: string) => {
  const { setOwnedNFTS, setIsOwnedNFTsLoading, setShimmerOwnedNFTS } =
    useStoreActions((actions) => actions.profile);
  const { activeWallet } = useStoreState((state) => state.wallet);

  const { selectedBlockchain } = useStoreState((state) => state.app);

  const config = {
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
  };
  const alchemy = new Alchemy(config);

  useEffect(() => {
    setIsOwnedNFTsLoading(true);
    if (selectedBlockchain?.currency_symbol === 'ETH') {
      const fetchNFTS = async () => {
        const nfts = await alchemy.nft.getNftsForOwner(address);
        setOwnedNFTS(nfts.ownedNfts);
      };

      try {
        fetchNFTS();
      } catch (error) {
        console.error(error);
      } finally {
        setIsOwnedNFTsLoading(false);
      }
    } else if (selectedBlockchain?.currency_symbol === 'SMR') {
      const fetchNfts = async () => {
        const nfts = await useGetNFTsInCollection(1, 0, 100);

        const ownedNfts = nfts?.filter(
          (nft) => nft.owner.toLowerCase() === activeWallet
        );
        setShimmerOwnedNFTS(ownedNfts as IShimmerNFT[]);
      };

      try {
        fetchNfts();
      } catch (error) {
        console.error(error);
      } finally {
        setIsOwnedNFTsLoading(false);
      }
    }
  }, [address, selectedBlockchain]);
};
