import axios from 'axios';
import { useEffect } from 'react';
import { useStoreActions, useStoreState } from '../store';
// Alchemy URL

// Make the request and print the formatted response:
export const useFetchNFTS = (address: string) => {
  const baseURL = `https://eth-mainnet.g.alchemy.com/v2/Tu8fHYlmkdbQDj9kii-48kis2aqdW2st`;
  const url = `${baseURL}/getNFTs/?owner=${address}`;

  const { ownedNfts } = useStoreState((state) => state.profile);
  const { setOwnedNFTS } = useStoreActions((actions) => actions.profile);

  useEffect(() => {
    //Fetch nfts on Ethereum
    axios
      .get(url)
      .then((response) => setOwnedNFTS(response['data']['ownedNfts']))
      .catch((error) => console.log('error', error));

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
