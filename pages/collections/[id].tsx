import React, { useReducer, useEffect, useState } from 'react';
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
import { CollectionTraits } from '../../mocks/SingleCollectionPage.mock';
import { useStoreState } from '../../store';
import { useRouter } from 'next/router';
import { useFetchSingleCollection } from '../../service/useFetchSingleCollection';
import { Spinner } from '../../components/spinner';
import BaseLink from '../../components/ui/Base/BaseLink/BaseLink';
import { Searchbar } from '../../components/Searchbar/Searchbar';
import { useFetchAlchemyCollection } from '../../service/useFetchAlchemyCollection';
import { OwnedNft } from 'alchemy-sdk';
import useGetNFTsInCollection from '../../service/collection/useGetNFTsInCollection';
import { IShimmerNFT } from '../../components/ui/NFTCard/ShimmerNFTCard.types';
import ShimmerNFTCard from '../../components/ui/NFTCard/ShimmerNFTCard';

const SingleCollectionPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { filters } = useStoreState((state) => state.filter);
  const { collectionData, isLoading, collectionNFTS } = useStoreState(
    (state) => state.singleCollection
  );

  const [nfts, setNFTS] = useState<IShimmerNFT[] | undefined>([]);

  function hasTrait(nft: OwnedNft): boolean | undefined {
    const hasFilter = nft.rawMetadata?.attributes?.some((trait) => {
      return filters.some(
        (filter) =>
          filter.value === trait.value && filter.trait_type === trait.trait_type
      );
    });
    return hasFilter;
  }

  useFetchSingleCollection(id);
  useFetchAlchemyCollection();

  useEffect(() => {
    setNFTS(undefined);
    const fetchNFTS = async () => {
      if (collectionData) {
        const nfts = await useGetNFTsInCollection(
          collectionData.tokenId,
          0,
          50
        );
        setNFTS(nfts);
      }
    };
    try {
      fetchNFTS();
    } catch (error) {
      console.error(error);
    }
  }, [collectionData]);

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
              <BaseLink href={collectionData.website} isExternal>
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
            <div className={styles.filterContainer}>
              <MultipleFilter values={CollectionTraits} hasPrice={true} />
            </div>
            <div className={styles.results}>
              <div className={'flex-col-start'}>
                <div className="flex-row-start">
                  <Searchbar
                    onHandleSearch={function (value: string): void {
                      throw new Error('Function not implemented.');
                    }}
                    onClearSearch={() =>
                      console.log('clear collection search ')
                    }
                  />
                  <FiltersBar />
                </div>
                <div className="flex-row-start">
                  {collectionNFTS &&
                    collectionNFTS.map((nft, index) => {
                      if (hasTrait(nft)) {
                        return <NftCard nft={nft} key={index + nft.tokenId} />;
                      } else if (filters.length === 0) {
                        return <NftCard nft={nft} key={index + nft.tokenId} />;
                      }
                    })}
                </div>

                <div className="flex-row-start">
                  {nfts &&
                    nfts.map((nft, index) => (
                      <ShimmerNFTCard nft={nft} key={index + nft.id} />
                    ))}
                </div>
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
