import React, { useReducer } from 'react';
import BasePage from '../../components/ui/Base/BasePage/BasePage';
import styles from '../../styles/pages/SingleCollectionPage.module.scss';
import BaseImage from '../../components/ui/Base/BaseImage/BaseImage';
import DescriptionSticker from '../../components/DescriptionSticker/DescriptionSticker';
import Icon from '../../components/ui/Icon/Icon';
import classNames from 'classnames';
import { FaDiscord, FaInstagram, FaTwitter } from 'react-icons/fa';
import { MultipleFilter } from '../../components/MulitpleFilter/MultipleFilter';
import FiltersBar from '../../components/FiltersBar/FiltersBar';
import { NftCard } from '../../components/ui/NFTCard/NFTCard';
import {
  CollectionNFTS,
  CollectionTraits,
} from '../../mocks/SingleCollectionPage.mock';
import { useStoreState } from '../../store';
import { INftCardProps } from '../../components/ui/NFTCard/NFTCard.types';
import { useRouter } from 'next/router';
import { useFetchSingleCollection } from '../../service/useFetchSingleCollection';
import { Spinner } from '../../components/spinner';
import BaseLink from '../../components/ui/Base/BaseLink/BaseLink';

const SingleCollectionPage = () => {
  const router = useRouter();
  const { query } = router;
  const { filters } = useStoreState((state) => state.filter);
  const { collectionData, isLoading } = useStoreState(
    (state) => state.singleCollection
  );
  function hasTrait(nft: INftCardProps): boolean {
    const hasFilter = nft.traits?.some((trait) => {
      return filters.some(
        (filter) =>
          filter.value === trait.value && filter.trait_type === trait.trait_type
      );
    });
    return hasFilter;
  }
  useFetchSingleCollection(query.id);
  return (
    <BasePage>
      {collectionData && !isLoading ? (
        <>
          <div className={styles.hero}>
            <div className={styles.image}>
              <BaseImage imageUrl={collectionData.image} />
            </div>
            <div className={classNames(styles.textContainer, 'flex-col-start')}>
              <div className={styles.icons}>
                <h1 className={styles.name}>{collectionData.name}</h1>
                <Icon icon={<FaDiscord style={{ width: '20px' }} />} />
                <Icon icon={<FaTwitter style={{ width: '20px' }} />} />
                <Icon icon={<FaInstagram style={{ width: '20px' }} />} />
              </div>
              <p>{collectionData.description}</p>
              <BaseLink href={collectionData.website}>
                {collectionData.website}
              </BaseLink>
              <div className={styles.stickersContainer}>
                <DescriptionSticker
                  title={'Floor'}
                  data={'123'}
                  type={'PRIMARY'}
                />
                <DescriptionSticker
                  title={'Listed'}
                  data={'12 123'}
                  type={'PRIMARY'}
                />
                <DescriptionSticker
                  title={'Total Volume'}
                  data={'123'}
                  type={'PRIMARY'}
                />
                <DescriptionSticker
                  title={'Avg. Sale'}
                  data={'12'}
                  type={'PRIMARY'}
                />
                <DescriptionSticker
                  title={'Owners'}
                  data={'123'}
                  type={'SECONDARY'}
                />
                <DescriptionSticker
                  title={'Total Supply'}
                  data={'12'}
                  type={'SECONDARY'}
                />
              </div>
            </div>
          </div>

          <div className={styles.nftContainer}>
            <MultipleFilter values={CollectionTraits} />
            <div className={styles.results}>
              <FiltersBar />
              <div className={'flex-row-start'}>
                {CollectionNFTS &&
                  CollectionNFTS.map((nft, index) => {
                    if (hasTrait(nft)) {
                      return (
                        <NftCard
                          key={nft.tokenId + index}
                          name={nft.name}
                          seller={nft.seller}
                          owner={nft.owner}
                          description={nft.description}
                          img={nft.img}
                          price={nft.price}
                          tokenId={0}
                          traits={nft.traits}
                        />
                      );
                    } else if (filters.length === 0) {
                      return (
                        <NftCard
                          key={nft.tokenId + index}
                          name={nft.name}
                          seller={nft.seller}
                          owner={nft.owner}
                          description={nft.description}
                          img={nft.img}
                          price={nft.price}
                          tokenId={0}
                          traits={nft.traits}
                        />
                      );
                    }
                  })}
              </div>
            </div>
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </BasePage>
  );
};

export default SingleCollectionPage;
