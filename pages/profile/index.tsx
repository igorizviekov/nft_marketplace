import React, { useEffect, useState } from 'react';
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
import { useRouter } from 'next/router';
import useFetchProfile from '../../service/useFetchProfile';
import { useStoreState } from '../../store';
import { Spinner } from '../../components/spinner';
import BaseLink from '../../components/ui/Base/BaseLink/BaseLink';
import { NoNFTCard } from '../../components/ui/NFTCard/NoNFTCard';
import useFetchNFTLogs from '../../service/useFetchNFTLogs';
import BaseTable from '../../components/BaseTable/BaseTable';
import ActivityBody from '../../components/BaseTable/TableBodies/ActivityBody/ActivityBody';
import { useFetchNFTS } from '../../service/useFetchNFTS';
import axios from 'axios';

const ProfilePage = () => {
  const router = useRouter();
  const { profile, nftLogs, ownedNfts } = useStoreState(
    (state) => state.profile
  );
  const { activeWallet, isWalletConnected } = useStoreState(
    (state) => state.wallet
  );
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [isOwnProfile, setIsOwnProfile] = useState<boolean>(true);
  const options = ['My NFTs', 'Listed', 'Created', 'Liked', 'Activity'];

  console.log(ownedNfts, 'owned');
  const foundNFTS =
    ownedNfts &&
    ownedNfts.map((nft, index) => {
      return (
        <NftCard
          key={index + nft.contract.address}
          name={nft.title}
          seller={nft.contract.address}
          owner={nft.contract.address}
          description={nft.description}
          collectionName={nft.contractMetadata.openSea.collectionName}
          img={nft.contractMetadata.openSea.imageUrl}
          price={nft.contractMetadata.openSea.floorPrice}
          tokenId={nft.id.tokenId}
          traits={nft.metadata.attributes}
          address={nft.id.tokenId}
        />
      );
    });

  useFetchProfile();
  useFetchNFTS(activeWallet);
  useFetchNFTLogs(activeWallet);

  return (
    <BasePage>
      {profile && isWalletConnected ? (
        <>
          <div className={styles.hero}>
            <div className={styles.imageContainer}>
              <BaseImage />
            </div>
            <div className={classNames(styles.textContainer)}>
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
                <BaseTable
                  body={<ActivityBody activities={nftLogs} />}
                  header={[
                    'NFT Data',
                    'Transation Type',
                    'Seller',
                    'Buyer',
                    'Time',
                    'Amount',
                  ]}
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
