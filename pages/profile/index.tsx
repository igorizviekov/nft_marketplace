import React, { useState } from 'react';
import classNames from 'classnames';
import BaseImage from '../../components/ui/Base/BaseImage/BaseImage';
import styles from '../../styles/pages/ProfilePage.module.scss';
import Icon from '../../components/ui/Icon/Icon';
import { FaDiscord, FaEdit, FaInstagram, FaTwitter } from 'react-icons/fa';
import { Tabs } from '../../components/ui/Tabs/Tabs';
import { MockNFTS } from '../../mocks/CreatorPage.mock';
import { NftCard } from '../../components/ui/NFTCard/NFTCard';
import BasePage from '../../components/ui/Base/BasePage/BasePage';
import DescriptionSticker from '../../components/DescriptionSticker/DescriptionSticker';
import { FiEdit } from 'react-icons/fi';

const ProfilePage = () => {
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [isOwnProfile, setIsOwnProfile] = useState<boolean>(true);
  const options = ['My NFTs', 'Listed', 'Created', 'Liked', 'Activity'];

  return (
    <BasePage>
      <div className={styles.hero}>
        <div className={styles.imageContainer}>
          <BaseImage />
        </div>
        <div className={classNames(styles.textContainer, 'flex-col-start')}>
          <div className={styles.icons}>
            <h1 className={styles.name}>Johanna DOE</h1>
            <Icon icon={<FaDiscord style={{ width: '20px' }} />} />
            <Icon icon={<FaTwitter />} />
            <Icon icon={<FaInstagram />} />
            {isOwnProfile && (
              <Icon
                icon={<FiEdit style={{ width: '22px', height: '22px' }} />}
                className={styles.profileIcon}
              />
            )}
          </div>
          <p>
            Nulla consequat massa quis enim. Donec pede justo, fringilla vel,
            aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut,
            imperdiet a, venenatis vitae, justo. Nulla consequat massa quis
            enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget,
            arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae,
            justo.
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
            <DescriptionSticker title={'Owned'} data={'12'} type={'PRIMARY'} />
            <DescriptionSticker
              title={'For Sale'}
              data={'123'}
              type={'SECONDARY'}
            />
            <DescriptionSticker
              title={'Owned'}
              data={'12'}
              type={'SECONDARY'}
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
        <div className={styles.nftRow}>
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
                  traits={nft.traits}
                />
              );
            }
          })}
        </div>
      </div>
    </BasePage>
  );
};

export default ProfilePage;
