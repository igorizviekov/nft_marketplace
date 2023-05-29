import React from 'react';
import BasePage from '../../components/ui/Base/BasePage/BasePage';
import { useStoreState } from '../../store';
import { useFetchCollections } from '../../service/useFetchCollections';
import BaseTable from '../../components/BaseTable/BaseTable';
import CollectionsBody from '../../components/BaseTable/TableBodies/CollectionsBody/CollectionsBody';
import { Spinner } from '../../components/spinner';

const CollectionsPage = () => {
  const { collections, isCollectionsLoading } = useStoreState(
    (state) => state.app
  );

  const header: string[] = [
    'Collection',
    'Floor',
    'Volume',
    'Sales',
    'Owners',
    'Supply',
  ];

  useFetchCollections();

  return (
    <BasePage>
      {collections && !isCollectionsLoading ? (
        <BaseTable
          header={header}
          body={<CollectionsBody collections={collections} />}
        />
      ) : (
        <Spinner />
      )}
    </BasePage>
  );
};

export default CollectionsPage;
