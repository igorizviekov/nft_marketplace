import React, { useState } from 'react';
import classNames from 'classnames';
import BaseImage from '../../components/ui/BaseImage/BaseImage';
import styles from '../../styles/pages/ProfilePage.module.scss';
import Icon from '../../components/ui/Icon/Icon';
import { FaDiscord, FaInstagram, FaTwitter } from 'react-icons/fa';
import { Tabs } from '../../components/ui/Tabs/Tabs';
import { MockNFTS } from '../../mocks/ProfilePage.mock';
import { NftCard } from '../../components/ui/nft-card';
const CreatorsPage = () => {
  const [selectedTab, setSelectedTab] = useState<number>(0);

  const options = ['On Sale', 'Created', 'Owned', 'Liked', 'Activity'];
  return (
    <div className={classNames('section flex-col')}>
      <div className="flex-row">
        <div className={styles.imageContainer}>
          <BaseImage />
        </div>
        <div className={classNames(styles.textContainer, 'flex-col')}>
          <h1>Johanna DOE</h1>
          <div className="flex-row-start">
            <Icon icon={<FaDiscord />} />
            <Icon icon={<FaTwitter />} />
            <Icon icon={<FaInstagram />} />
          </div>
          <p>
            Nulla consequat massa quis enim. Donec pede justo, fringilla vel,
            aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut,
            imperdiet a, venenatis vitae, justo. Nulla consequat massa quis
            enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget,
            arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae,
            justo.
          </p>
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
                />
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default CreatorsPage;
