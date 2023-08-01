import { useEffect } from 'react';
import { useStoreActions, useStoreState } from '../store';
import axios from 'axios';
import { ICollection } from '../store/model/app/app.types';

export const useFetchCollections = () => {
  const { setCollections, setIsCollectionLoading } = useStoreActions(
    (actions) => actions.app
  );

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_KEY}/collection`)
      .then((response) => {
        response.data.data.map((collection: ICollection) => {
          setCollections(collection);
          setIsCollectionLoading(false);
        });
      })
      .catch((error) => console.error(error));
  }, []);
};
