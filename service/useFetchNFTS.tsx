import axios from 'axios';
import { useEffect } from 'react';
import { useStoreActions, useStoreState } from '../store';
import { Alchemy, Network, OwnedNft } from 'alchemy-sdk';
import useGetNFTsInCollection from './collection/useGetNFTsInCollection';

export const useFetchNFTS = async (address: string) => {
  const { setOwnedNFTS } = useStoreActions((actions) => actions.profile);
  const { activeWallet } = useStoreState((state) => state.wallet);

  const { selectedBlockchain } = useStoreState((state) => state.app);

  const config = {
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
  };
  const alchemy = new Alchemy(config);

  useEffect(() => {
    if (selectedBlockchain?.currency_symbol === 'ETH') {
      const fetchNFTS = async () => {
        const nfts = await alchemy.nft.getNftsForOwner(address);
        setOwnedNFTS(nfts.ownedNfts);
      };

      try {
        fetchNFTS();
      } catch (error) {
        console.error(error);
      }
    } else if (selectedBlockchain?.currency_symbol === 'SMR') {
      const fetchNfts = async () => {
        const nfts = await useGetNFTsInCollection(1, 0, 100);
        console.log(nfts);

        const ownedNfts = nfts?.filter(
          (nft) => nft.owner.toLowerCase() === activeWallet
        );
        setOwnedNFTS(ownedNfts as OwnedNft[]);
      };

      try {
        fetchNfts();
      } catch (error) {
        console.error(error);
      }
    }
  }, [address, selectedBlockchain]);
};
