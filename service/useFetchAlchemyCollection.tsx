import axios from 'axios';
import { useStoreActions } from '../store';
import { Alchemy, Network, OwnedNft } from 'alchemy-sdk';
import { useStoreState } from '../store';
import { useEffect } from 'react';
import { network } from 'hardhat';

export const useFetchAlchemyCollection = () => {
  const { setCollectionNFTS } = useStoreActions(
    (actions) => actions.singleCollection
  );

  const { selectedBlockchain } = useStoreState((state) => state.app);

  // Contract address
  const address = '0xED5AF388653567Af2F388E6224dC7C4b3241C544';

  useEffect(() => {
    const fetchCollectionNfts = async () => {
      //@TODO UPDATE NETWORKS
      const selectedNetwork =
        selectedBlockchain?.currency_symbol === 'ETH'
          ? Network.ETH_MAINNET
          : Network.MATIC_MAINNET;

      const config = {
        apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
        network: Network.ETH_MAINNET,
      };
      const alchemy = new Alchemy(config);

      const { nfts } = await alchemy.nft.getNftsForContract(address);
      const metada = await alchemy.nft.getContractMetadata(address);
      setCollectionNFTS(nfts as OwnedNft[]);
    };

    try {
      fetchCollectionNfts();
    } catch (error) {
      console.error(error);
    }
  }, [address]);
};
