import BasePage from '../components/ui/Base/BasePage/BasePage';
import PopularCollection from '../components/PopularCollection/PopularCollection';
import { PopularCollectionsMock } from '../mocks/PopularCollections.mock';
import styles from '../styles/pages/HomePage.module.scss';
export default function Home() {
  return (
    <BasePage>
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
    </BasePage>
  );
}
