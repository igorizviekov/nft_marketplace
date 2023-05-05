import React, { useState } from 'react';
import classNames from 'classnames';
import BaseImage from '../../components/ui/Base/BaseImage/BaseImage';
import styles from '../../styles/pages/CreatorsPage.module.scss';
import Icon from '../../components/ui/Icon/Icon';
import { FaDiscord, FaInstagram, FaTwitter } from 'react-icons/fa';
import { Tabs } from '../../components/ui/Tabs/Tabs';
import { MockNFTS } from '../../mocks/CreatorPage.mock';
import { NftCard } from '../../components/ui/nft-card';
import BasePage from '../../components/ui/Base/BasePage/BasePage';
import DescriptionSticker from '../../components/DescriptionSticker/DescriptionSticker';

const CreatorsPage = () => {
  const [selectedTab, setSelectedTab] = useState<number>(0);

  const options = ['On Sale', 'Created', 'Owned', 'Liked', 'Activity'];
  return (
    <BasePage>
      <div className={classNames('section')}>
        <div className={styles.hero}>
          <div className={styles.imageContainer}>
            <BaseImage />
          </div>
          <div className={classNames(styles.textContainer, 'flex-col-start')}>
            <h1>Johanna DOE</h1>
            <div className={styles.icons}>
              <Icon icon={<FaDiscord />} className={styles.icon} />
              <Icon icon={<FaTwitter />} className={styles.icon} />
              <Icon icon={<FaInstagram />} className={styles.icon} />
            </div>
            <p>
              Nulla consequat massa quis enim. Donec pede justo, fringilla vel,
              aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut,
              imperdiet a, venenatis vitae, justo. Nulla consequat massa quis
              enim. Donec pede justo, fringilla vel, aliquet nec, vulputate
              eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis
              vitae, justo.
            </p>
            <div className={styles.stickersContainer}>
              <DescriptionSticker
                title={'Follower'}
                data={'123 123'}
                type={'PRIMARY'}
              />
              <DescriptionSticker
                title={'Following'}
                data={'12 123'}
                type={'PRIMARY'}
              />
              <DescriptionSticker
                title={'For Sale'}
                data={'123'}
                type={'PRIMARY'}
              />
              <DescriptionSticker
                title={'Owned'}
                data={'12'}
                type={'PRIMARY'}
              />
            </div>
          </div>
        </div>

        <div className="flex-col">
          <Tabs
            options={options}
            selected={selectedTab}
            handleChange={setSelectedTab}
          />
          <div className="flex-row-start">
            {MockNFTS.map((nft, index) => {
              if (nft.status === options[selectedTab]) {
                return (
                  <NftCard
                    key={index + nft.tokenId}
                    name={nft.name}
                    seller={nft.seller}
                    owner={nft.owner}
                    description={nft.description}
                    img={nft.img}
                    price={nft.price}
                    tokenId={nft.tokenId}
                    traits={[]}
                  />
                );
              }
            })}
          </div>
        </div>
      </div>
    </BasePage>
  );
};

export default CreatorsPage;
