import BasePage from '../components/ui/Base/BasePage/BasePage';
import PopularCollection from '../components/PopularCollection/PopularCollection';
import { PopularCollectionsMock } from '../mocks/PopularCollections.mock';
import styles from '../styles/pages/HomePage.module.scss';
import { LaunchpadDropsMocks } from '../mocks/LaunchpadDrops.mock';
import LaunchpadDrops from '../components/LaunchpadDrops/LaunchpadDrops';
import Filter from '../components/Filter/Filter';
export default function Home() {
  //popular with timeline
  //upcoming collections
  //categories
  return (
    <BasePage>
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

      <h1>Launchpad drops</h1>
      <div className="flex-row-scroll">
        {LaunchpadDropsMocks &&
          LaunchpadDropsMocks.map((drop, index) => (
            <LaunchpadDrops
              key={index}
              image={drop.image}
              network={drop.network}
              name={drop.name}
              launchDate={drop.launchDate}
              isCategory={false}
            />
          ))}
      </div>

      <h1>Categories</h1>
      <Filter />
      <div className="flex-row-scroll">
        {LaunchpadDropsMocks &&
          LaunchpadDropsMocks.map((drop, index) => (
            <LaunchpadDrops
              key={index}
              image={drop.image}
              network={drop.network}
              name={drop.name}
              launchDate={drop.launchDate}
              isCategory={true}
            />
          ))}
      </div>
    </BasePage>
  );
}
