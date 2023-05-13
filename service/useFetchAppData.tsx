import axios from 'axios';
import { useStoreActions, useStoreState } from '../store';
import { useEffect } from 'react';
import { IBlockchain } from '../store/model/app/app.types';
export async function useFetchAppData() {
  const { setBlockchains, setIsLoading } = useStoreActions(
    (actions) => actions.app
  );
  const { blockchains } = useStoreState((state) => state.app);
  useEffect(() => {
    if (blockchains.length === 0) {
      axios
        .get('https://nft-api-production-3c8d.up.railway.app/blockchain')
        .then((response) => {
          response.data.data.map((blockchain: IBlockchain) => {
            setBlockchains(blockchain);
            setIsLoading(false);
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);
}
