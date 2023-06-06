import axios from 'axios';
import { useStoreActions } from '../store';
import { INFT } from '../store/model/profile/profile.types';
import { Alchemy, Network } from 'alchemy-sdk';

export const useFetchAlchemyCollection = async () => {
  // Contract address
  const { setCollectionNFTS } = useStoreActions(
    (actions) => actions.singleCollection
  );

  try {
    const address = '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D';

    const config = {
      apiKey: 'Tu8fHYlmkdbQDj9kii-48kis2aqdW2st',
      network: Network.ETH_MAINNET,
    };
    const alchemy = new Alchemy(config);

    const omitMetadata = false;

    const { nfts } = await alchemy.nft.getNftsForContract(address, {
      omitMetadata: omitMetadata,
    });

    let i = 1;

    setCollectionNFTS(nfts)
    for (let nft of nfts) {
      console.log(`${i}. ${JSON.stringify(nft, null, 2)}`);
      i++;
    }
  } catch (error) {
    console.error(error);
  }
};
