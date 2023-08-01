import { useEffect } from 'react';
import { useStoreActions } from '../store';
import axios from 'axios';

export const useFetchSingleCollection = (id: string | string[] | undefined) => {
  const { setCollectionData, setIsLoading } = useStoreActions(
    (actions) => actions.singleCollection
  );

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      axios
        .get(`${process.env.NEXT_PUBLIC_API_KEY}/collection/${id}`)
        .then((response) => {
          setCollectionData(response.data.data);
          setIsLoading(false);
        })
        .catch((error) => console.error(error));
    }
  }, [id]);
};
