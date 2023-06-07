import axios from 'axios';
import { useEffect } from 'react';
import { useStoreActions, useStoreState } from '../store';
import { Alchemy, Network } from 'alchemy-sdk';

// Make the request and print the formatted response:
export const useFetchNFTS = async (address: string) => {
  const { ownedNfts } = useStoreState((state) => state.profile);
  const { setOwnedNFTS } = useStoreActions((actions) => actions.profile);

  const config = {
    apiKey: 'Tu8fHYlmkdbQDj9kii-48kis2aqdW2st',
    network: Network.ETH_MAINNET,
  };
  const alchemy = new Alchemy(config);
  useEffect(() => {
    const fetchNFTS = async () => {
      const nfts = await alchemy.nft.getNftsForOwner(address);

      console.log(nfts.ownedNfts, 'nftsss');
      setOwnedNFTS(nfts.ownedNfts)
    };

    try {
      fetchNFTS();
    } catch (error) {
      console.error(error);
    }

    //Fetch nfts on shimmer
    axios
      .get(
        `https://explorer.evm.testnet.shimmer.network/api?module=account&action=tokenlist&address=${address}`
      )
      .then((response) =>
        setOwnedNFTS([...ownedNfts, ...response['data']['result']])
      )
      .catch((error) => console.log(error));
  }, [address]);
};
