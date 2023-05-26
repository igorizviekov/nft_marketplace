import { useEffect } from 'react';
import { useStoreActions, useStoreState } from '../store';
import axios from 'axios';
import { ICollection } from '../store/model/app/app.types';

export const useFetchCollections = () => {
  const { setCollections, setIsCollectionLoading } = useStoreActions(
    (actions) => actions.app
  );
  const { collections } = useStoreState((state) => state.app);

  useEffect(() => {
    if (collections.length === 0) {
      axios
        .get('https://nft-api-production-4aa1.up.railway.app/collection')
        .then((response) => {
          response.data.data.map((collection: ICollection) => {
            setCollections(collection);
            setIsCollectionLoading(false);
          });
        })
        .catch((error) => console.error(error));
    }
  }, []);
};
