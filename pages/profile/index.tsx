import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import BaseImage from '../../components/ui/Base/BaseImage/BaseImage';
import styles from '../../styles/pages/ProfilePage.module.scss';
import Icon from '../../components/ui/Icon/Icon';
import { FaDiscord, FaInstagram, FaTwitter } from 'react-icons/fa';
import { Tabs } from '../../components/ui/Tabs/Tabs';
import { NftCard } from '../../components/ui/NFTCard/NFTCard';
import BasePage from '../../components/ui/Base/BasePage/BasePage';
import DescriptionSticker from '../../components/DescriptionSticker/DescriptionSticker';
import { FiEdit } from 'react-icons/fi';
import { useRouter } from 'next/router';
import useFetchProfile from '../../service/useFetchProfile';
import { useStoreState, useStoreActions } from '../../store';
import { Spinner } from '../../components/spinner';
import BaseLink from '../../components/ui/Base/BaseLink/BaseLink';
import { NoNFTCard } from '../../components/ui/NFTCard/NoNFTCard';
import useFetchNFTLogs from '../../service/useFetchNFTLogs';
import BaseTable from '../../components/BaseTable/BaseTable';
import ActivityBody from '../../components/BaseTable/TableBodies/ActivityBody/ActivityBody';
import { useFetchNFTS } from '../../service/useFetchNFTS';
import { useStoreRehydrated } from 'easy-peasy';
import ShimmerNFTCard from '../../components/ui/NFTCard/ShimmerNFTCard';
import useUpdateUserCollections from '../../service/useUpdateUserCollections';
import CollectionsBody from '../../components/BaseTable/TableBodies/CollectionsBody/CollectionsBody';

const ProfilePage = () => {
  const router = useRouter();
  const {
    profile,
    nftLogs,
    ownedNfts,
    shimmerOwnedNfts,
    isOwnedNFTSLoading,
    collections,
  } = useStoreState((state) => state.profile);
  const { activeWallet, isWalletConnected } = useStoreState(
    (state) => state.wallet
  );
  const { updateCollections } = useStoreActions((actions) => actions.profile);

  const { selectedBlockchain } = useStoreState((state) => state.app);

  const isRehydrated = useStoreRehydrated();

  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [isOwnProfile, setIsOwnProfile] = useState<boolean>(true);
  const options = ['All NFTs', 'Listed', 'Collections', 'Activity'];

  const foundNfts =
    selectedBlockchain?.currency_symbol !== 'SMR'
      ? ownedNfts &&
        ownedNfts.map((nft, index) => {
          return <NftCard nft={nft} key={index} />;
        })
      : shimmerOwnedNfts &&
        shimmerOwnedNfts.map((nft, index) => {
          return <ShimmerNFTCard nft={nft} key={index} />;
        });

  useFetchProfile();
  useFetchNFTS(activeWallet);
  useEffect(() => {
    useUpdateUserCollections(updateCollections);
  }, []);
  return (
    <BasePage>
      {profile && isWalletConnected && isRehydrated ? (
        <>
          <div className={styles.hero}>
            <div className={styles.imageContainer}>
              <BaseImage imageUrl={profile.image} />
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
                {profile.twitter && (
                  <BaseLink href={'https://twitter.com'}>
                    <Icon icon={<FaTwitter style={{ width: '20px' }} />} />
                  </BaseLink>
                )}
                {profile.instagram && (
                  <BaseLink href={'https://instagram.com'}>
                    <Icon icon={<FaInstagram style={{ width: '20px' }} />} />
                  </BaseLink>
                )}
                {isOwnProfile && (
                  <Icon
                    icon={<FiEdit style={{ width: '22px', height: '22px' }} />}
                    className={styles.profileIcon}
                    onClick={() => router.push('/edit')}
                  />
                )}
              </div>
              {profile.description && <p>{profile.description}</p>}
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
                  data={shimmerOwnedNfts.length.toString()}
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
            {!isOwnedNFTSLoading ? (
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
                ) : options[selectedTab] === 'Collections' ? (
                  <BaseTable
                    body={
                      <CollectionsBody
                        collections={collections}
                        isProfileCollections
                      />
                    }
                    header={[
                      'Name',
                      'ID',
                      'Symbol',
                      'Website',
                      'Primary Category',
                      'Secondary Category',
                    ]}
                  />
                ) : !foundNfts.every((nft) => nft === undefined) ? (
                  foundNfts
                ) : (
                  <NoNFTCard />
                )}
              </div>
            ) : (
              <Spinner />
            )}
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </BasePage>
  );
};

export default ProfilePage;
