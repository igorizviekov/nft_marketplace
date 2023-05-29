import axios from 'axios';
import { useStoreActions, useStoreState } from '../store';
import { useEffect } from 'react';
import { IBlockchain } from '../store/model/app/app.types';
import { ContractFunctionVisibility } from 'hardhat/internal/hardhat-network/stack-traces/model';
export async function useFetchAppData() {
  const { setBlockchains, setIsLoading, setSelectedBlockchain } =
    useStoreActions((actions) => actions.app);
  const { blockchains } = useStoreState((state) => state.app);
  useEffect(() => {
    if (blockchains.length === 0) {
      axios
        .get('https://nft-api-production-4aa1.up.railway.app/blockchain')
        .then((response) => {
          response.data.data.map((blockchain: IBlockchain) => {
            setBlockchains(blockchain);
            setIsLoading(false);
          });
          setSelectedBlockchain(response.data.data[0]);
        })
        .catch((error) => console.error(error));
    }
  }, []);
}
