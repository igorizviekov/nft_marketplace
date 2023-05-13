import BasePage from '../components/ui/Base/BasePage/BasePage';
import PopularCollection from '../components/PopularCollection/PopularCollection';
import { PopularCollectionsMock } from '../mocks/PopularCollections.mock';
import styles from '../styles/pages/HomePage.module.scss';
import { LaunchpadDropsMocks } from '../mocks/LaunchpadDrops.mock';
import LaunchpadDrops from '../components/CollectionCard/CollectionCard';
import Filter from '../components/Filter/Filter';
import { useState } from 'react';
import { INFTCategories } from '../components/Filter/Filter.types';
import HomeHero from '../components/HomeHero/HomeHero';
import HorizontalScroll from '../components/HorizontalScroll/HorizontalScroll';
import { Button } from '../components/ui/Button';
import { useRouter } from 'next/router';
import NoCollectionCard from '../components/CollectionCard/NoCollectionCard';
import { useFetchCollections } from '../service/useFetchCollections';
import { useStoreState } from '../store';
export default function Home() {
  const [selected, setSelected] = useState<number>(0);
  const { isCollectionsLoading, collections } = useStoreState(
    (state) => state.app
  );
  const filterOptions: INFTCategories[] = [
    'Collectibles',
    'PFPS',
    'Art',
    'Games',
    'Virtual Worlds',
    'Sports',
    'Music',
  ];
  const router = useRouter();

  const foundLaunches =
    LaunchpadDropsMocks &&
    LaunchpadDropsMocks.map((drop, index) => {
      if (drop.category.includes(filterOptions[selected])) {
        return (
          <LaunchpadDrops
            key={index}
            image={drop.image}
            network={drop.network}
            name={drop.name}
            launchDate={drop.launchDate}
            isCategory={true}
            category={drop.category}
          />
        );
      } else if (selected === null) {
        return (
          <LaunchpadDrops
            key={index}
            image={drop.image}
            network={drop.network}
            name={drop.name}
            launchDate={drop.launchDate}
            isCategory={true}
            category={drop.category}
          />
        );
      }
    });

  useFetchCollections();
  return (
    <BasePage>
      <HomeHero
        title={'Phoenix Mint - We are Live!'}
        copy={
          "Attention all traders! Phoenix Mint is now live and ready for you to start trading NFTs. Don't miss out on this opportunity to own unique digital assets for a fraction of the cost. Start trading today at unbeatable prices! #NFT #PhoenixMint #CryptoTrading"
        }
        callToAction={'Call me to action!'}
      />
      <div>
        <h1>Popular Collections</h1>
        <div className={'grid-container'}>
          {collections &&
            !isCollectionsLoading &&
            collections.map((collection, index) => (
              <PopularCollection
                id={collection.id}
                image={collection.image}
                name={collection.name}
                key={index}
                index={index}
              />
            ))}
        </div>
        <div className={styles.button}>
          <Button
            isPrimary={false}
            label={'View all collections'}
            onClick={() => router.push('collections')}
          />
        </div>
      </div>

      <div>
        <h1>New Launches</h1>
        <HorizontalScroll>
          {LaunchpadDropsMocks &&
            LaunchpadDropsMocks.map((drop, index) => (
              <LaunchpadDrops
                key={index}
                image={drop.image}
                network={drop.network}
                name={drop.name}
                launchDate={drop.launchDate}
                isCategory={false}
                category={drop.category}
              />
            ))}
        </HorizontalScroll>
      </div>

      <div>
        <h1>Trending by Category</h1>
        <Filter
          options={filterOptions}
          selected={selected}
          onSelect={setSelected}
        />

        <HorizontalScroll>
          {!foundLaunches.every((found) => found === undefined) ? (
            foundLaunches
          ) : (
            <NoCollectionCard />
          )}
        </HorizontalScroll>
      </div>
    </BasePage>
  );
}
