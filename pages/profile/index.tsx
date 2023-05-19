import React, { useState } from 'react';
import classNames from 'classnames';
import BaseImage from '../../components/ui/Base/BaseImage/BaseImage';
import styles from '../../styles/pages/ProfilePage.module.scss';
import Icon from '../../components/ui/Icon/Icon';
import { FaDiscord, FaInstagram, FaTwitter } from 'react-icons/fa';
import { Tabs } from '../../components/ui/Tabs/Tabs';
import { MockNFTS } from '../../mocks/CreatorPage.mock';
import { NftCard } from '../../components/ui/NFTCard/NFTCard';
import BasePage from '../../components/ui/Base/BasePage/BasePage';
import DescriptionSticker from '../../components/DescriptionSticker/DescriptionSticker';
import { FiEdit } from 'react-icons/fi';
import ActivityBanner from '../../components/ActivityBanner/ActivityBanner';
import { useRouter } from 'next/router';
import useFetchProfile from '../../service/useFetchProfile';
import { useStoreState } from '../../store';
import { Spinner } from '../../components/spinner';
import BaseLink from '../../components/ui/Base/BaseLink/BaseLink';
import { NoNFTCard } from '../../components/ui/NFTCard/NoNFTCard';
import { useFetchNFTs } from '../../service/useFetchNFTS';
import useFetchNFTLogs from '../../service/useFetchNFTLogs';

const ProfilePage = () => {
  const router = useRouter();
  const { profile } = useStoreState((state) => state.profile);
  const { activeWallet } = useStoreState((state) => state.wallet);
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [isOwnProfile, setIsOwnProfile] = useState<boolean>(true);
  const options = ['My NFTs', 'Listed', 'Created', 'Liked', 'Activity'];

  const foundNFTS = MockNFTS.map((nft, index) => {
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
  });
  useFetchProfile();
  useFetchNFTLogs(activeWallet);
  return (
    <BasePage>
      {profile ? (
        <>
          <div className={styles.hero}>
            <div className={styles.imageContainer}>
              <BaseImage />
            </div>
            <div className={classNames(styles.textContainer, 'flex-col-start')}>
              <div className={styles.icons}>
                <h1 className={styles.name}>{profile.name}</h1>
                {profile.discord && (
                  <BaseLink
                    href={`https://discordapp.com/users/${profile.discord}`}
                  >
                    <Icon icon={<FaDiscord style={{ width: '20px' }} />} />
                  </BaseLink>
                )}
                {/* {profile.twitter && (
                  <BaseLink href={'https://twitter.com'}>
                    <Icon icon={<FaTwitter style={{ width: '20px' }} />} />
                  </BaseLink>
                )}
                {profile.instagram && (
                  <BaseLink href={'https://instagram.com'}>
                    <Icon icon={<FaInstagram style={{ width: '20px' }} />} />
                  </BaseLink>
                )} */}
                {isOwnProfile && (
                  <Icon
                    icon={<FiEdit style={{ width: '22px', height: '22px' }} />}
                    className={styles.profileIcon}
                    onClick={() => router.push('/edit')}
                  />
                )}
              </div>
              {/* <p>{profile.description}</p> */}
              <BaseLink href={`http://${profile.website}`}>
                {profile.website}
              </BaseLink>
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
              {options[selectedTab] === 'Activity' ? (
                <ActivityBanner
                  img={''}
                  name={'Rusty Robot Country Club #1010'}
                  transactionType={'Listing'}
                  seller={'0xa3de3788307a25f76815edde4776e7c1d25a3684'}
                  buyer={'0xa3de3788307a25f76815edde4776e7c1d25a3684'}
                  time={new Date('2023-05-06T17:30:01')}
                  total={13}
                />
              ) : !foundNFTS.every((nft) => nft === undefined) ? (
                foundNFTS
              ) : (
                <NoNFTCard />
              )}
            </div>
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </BasePage>
  );
};

export default ProfilePage;
