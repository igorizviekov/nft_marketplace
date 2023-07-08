import axios from 'axios';
import { useEffect } from 'react';
import { useStoreActions, useStoreState } from '../store';
import { Alchemy, Network } from 'alchemy-sdk';

// Make the request and print the formatted response:
export const useFetchNFTS = (address: string) => {
  const { ownedNfts } = useStoreState((state) => state.profile);
  const { setOwnedNFTS } = useStoreActions((actions) => actions.profile);

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
      axios
        .get(`${process.env.NEXT_PUBLIC_SHIMMER_NFT_URL}${address}`)
        .then((response) => {
          console.log(response, 'shimmer resp');

          axios
            .get(
              `${
                process.env.NEXT_PUBLIC_SHIMMER_NFT_URL
              }${'0xcf7ed3acca5a467e9e704c703e8d87f634fb0fc9'}`
            )
            .then((response) => console.log(response, 'collection resp'));
          setOwnedNFTS(response['data']['result']);
        })
        .catch((error) => console.log(error));
    }
  }, [address, selectedBlockchain]);
};
