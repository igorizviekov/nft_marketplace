import React from 'react';
import { useRouter } from 'next/router';
import BaseImage from '../../../ui/Base/BaseImage/BaseImage';
import { ICollectionsBodyProps } from './CollectionsBody.types.d';
import { useStoreState } from '../../../../store';
import styles from './CollectionsBody.module.scss';
const CollectionsBody = ({
  collections,
  isProfileCollections,
}: ICollectionsBodyProps) => {
  const router = useRouter();
  const { blockchains } = useStoreState((state) => state.app);

  return (
    <tbody className={styles.body}>
      {collections.map((collection, index) => (
        <tr
          key={index}
          onClick={() =>
            router.push(
              {
                pathname: `/collections/${collection.name
                  .split(' ')
                  .join('-')
                  .toLowerCase()}`,
                query: { uid: collection.id },
              },
              `/collections/${collection.name
                .split(' ')
                .join('-')
                .toLowerCase()}`
            )
          }
        >
          <td className={styles.mainData}>
            <p className={styles.index}>{index + 1}</p>
            <div className={styles.image}>
              <BaseImage imageUrl={collection.image} />
            </div>
            <div className={styles.collectionName}>{collection.name}</div>
          </td>
          {isProfileCollections ? (
            <>
              <td>{collection.tokenId}</td>
              <td>{collection.symbol}</td>
              <td>{collection.website}</td>
              <td>{collection.categoryPrimary}</td>
              <td>{collection.categorySecondary}</td>
            </>
          ) : (
            <>
              <td>' - '</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
            </>
          )}
        </tr>
      ))}
    </tbody>
  );
};

export default CollectionsBody;
