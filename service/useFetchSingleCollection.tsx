import { useEffect } from 'react';
import { useStoreActions, useStoreState } from '../store';
import axios from 'axios';

export const useFetchSingleCollection = (id: string | string[] | undefined) => {
  const { setCollectionData, setIsLoading } = useStoreActions(
    (actions) => actions.singleCollection
  );

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      axios
        .get(`https://nft-api-production-4aa1.up.railway.app/collection/${id}`)
        .then((response) => {
          setCollectionData(response.data.data);
          setIsLoading(false);
        })
        .catch((error) => console.error(error));
    }
  }, [id]);
};
