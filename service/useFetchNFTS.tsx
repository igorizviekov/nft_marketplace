import { useEffect } from 'react';
import { useStoreActions, useStoreState } from '../store';
import { Alchemy, Network } from 'alchemy-sdk';
import useGetNFTsInCollection from './collection/useGetNFTsInCollection';
import { IShimmerNFT } from '../components/ui/NFTCard/ShimmerNFTCard.types';
import useGetCollectionOfToken from './collection/useGetCollectionOfToken';
import { AiOutlineConsoleSql } from 'react-icons/ai';

export const useFetchNFTS = (address: string) => {
  const {
    setOwnedNFTS,
    setIsOwnedNFTsLoading,
    setShimmerOwnedNFTS,
    setShimmerOwnedNFTSCollections,
  } = useStoreActions((actions) => actions.profile);
  const { shimmerOwnedNfts, collections } = useStoreState(
    (state) => state.profile
  );
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
        collections.forEach(async (collection) => {
          const nfts = await useGetNFTsInCollection(collection.tokenId, 0, 100);
          const ownedNfts = nfts?.filter(
            (nft) => nft.owner.toLowerCase() === activeWallet
          );
          setShimmerOwnedNFTS(ownedNfts as IShimmerNFT[]);
        });
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
