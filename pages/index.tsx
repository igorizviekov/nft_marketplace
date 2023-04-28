import BasePage from '../components/ui/Base/BasePage/BasePage';
import PopularCollection from '../components/PopularCollection/PopularCollection';
import { PopularCollectionsMock } from '../mocks/PopularCollections.mock';
import styles from '../styles/pages/HomePage.module.scss';
import { LaunchpadDropsMocks } from '../mocks/LaunchpadDrops.mock';
import LaunchpadDrops from '../components/LaunchpadDrops/LaunchpadDrops';
import Filter from '../components/Filter/Filter';
import { useState } from 'react';
import { INFTCategories } from '../components/Filter/Filter.types';
import { MultipleFilter } from '../components/MulitpleFilter/MultipleFilter';
import FiltersBar from '../components/FiltersBar/FiltersBar';
import HomeHero from '../components/HomeHero/HomeHero';
import HorizontalScroll from '../components/HorizontalScroll/HorizontalScroll';
export default function Home() {
  const [selected, setSelected] = useState<number>(0);
  const filterOptions: INFTCategories[] = ['Cat 1', 'Cat 2', 'Cat 3'];

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
          {PopularCollectionsMock &&
            PopularCollectionsMock.map((collection, index) => (
              <PopularCollection
                image={collection.image}
                name={collection.name}
                floorPrice={collection.floorPrice}
                volume={collection.volume}
                key={index}
                index={index}
              />
            ))}
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
          {LaunchpadDropsMocks &&
            LaunchpadDropsMocks.map((drop, index) => {
              if (
                drop.category &&
                selected !== null &&
                drop.category.includes(filterOptions[selected])
              ) {
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
            })}
        </HorizontalScroll>
      </div>
      <div>
        <h1>MULTIPLE FILTER</h1>
        <div className={styles.filterContainer}>
          <MultipleFilter />
          <FiltersBar />
        </div>
      </div>
    </BasePage>
  );
}
