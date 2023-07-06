import axios from 'axios';
import { useEffect } from 'react';
import { useStoreActions, useStoreState } from '../store';
import { Alchemy, Network } from 'alchemy-sdk';

// Make the request and print the formatted response:
export const useFetchNFTS = (address: string) => {
  const { ownedNfts } = useStoreState((state) => state.profile);
  const { setOwnedNFTS } = useStoreActions((actions) => actions.profile);

  const config = {
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
  };
  const alchemy = new Alchemy(config);
  useEffect(() => {
    const fetchNFTS = async () => {
      const nfts = await alchemy.nft.getNftsForOwner(address);
      setOwnedNFTS(nfts.ownedNfts);
    };

    try {
      fetchNFTS();
    } catch (error) {
      console.error(error);
    }

    //Fetch nfts on shimmer
    // axios
    //   .get(`${process.env.NEXT_PUBLIC_SHIMMER_NFT_URL}${address}`)
    //   .then((response) =>
    //     setOwnedNFTS([...ownedNfts, ...response['data']['result']])
    //   )
    //   .catch((error) => console.log(error));
  }, [address]);
};
