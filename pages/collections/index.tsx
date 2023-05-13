import React from 'react';
import BasePage from '../../components/ui/Base/BasePage/BasePage';
import CollectionBanner from '../../components/CollectionBanner/CollectionBanner';
import { useStoreState } from '../../store';
import { useFetchCollections } from '../../service/useFetchCollections';

const CollectionsPage = () => {
  const { collections } = useStoreState((state) => state.app);

  useFetchCollections();
  return (
    <BasePage>
      <div>
        <h1>Collections</h1>
        {collections &&
          collections.map((collection, index) => (
            <CollectionBanner
              index={index + 1}
              uid={collection.id}
              name={collection.name}
              image={collection.image}
            />
          ))}
      </div>
    </BasePage>
  );
};

export default CollectionsPage;
