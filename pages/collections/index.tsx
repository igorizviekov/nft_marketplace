import React from 'react';
import BasePage from '../../components/ui/Base/BasePage/BasePage';
import { AllCollections } from '../../mocks/CollectionsPage.mock';
import CollectionBanner from '../../components/CollectionBanner/CollectionBanner';

const CollectionsPage = () => {
  return (
    <BasePage>
      <div>
        <h1>Collections</h1>
        {AllCollections &&
          AllCollections.map((collection, index) => (
            <CollectionBanner
              uid={0}
              index={index + 1}
              name={collection.name}
              floor={collection.floor}
              volume={collection.volume}
              sales={collection.sales}
              owners={collection.owners}
              supply={collection.supply}
            />
          ))}
      </div>
    </BasePage>
  );
};

export default CollectionsPage;
