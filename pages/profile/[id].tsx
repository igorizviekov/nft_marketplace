import React, { useState } from 'react';
import DescriptionSticker from '../../components/DescriptionSticker/DescriptionSticker';
import classNames from 'classnames';
import { Tabs } from '../../components/ui/Tabs/Tabs';
import BasePage from '../../components/ui/Base/BasePage/BasePage';
import ProfileImage from '../../components/ui/ProfileImage/ProfileImage';
import { TEST_IMAGE_URL } from '../../components/ui/Base/BaseImage/BaseImage';
import { ProfileMockNFTS } from '../../mocks/ProfileNFTS.mock';
import { NftCard } from '../../components/ui/nft-card';
const ProfilePage = () => {
  const [selected, setSelected] = useState<number>(0);

  const options = ['Outgoing Offers', 'Incoming Offers'];
  return (
    <BasePage>
      <div className={'section'}>
        <div className={'hero-section'}>
          <div className="flex-col-center">
            <DescriptionSticker
              title={'Followers'}
              data={'456 123'}
              type={'PRIMARY'}
            />
            <DescriptionSticker
              title={'Following'}
              data={'12 123'}
              type={'PRIMARY'}
            />
          </div>
          <ProfileImage
            profileName={'Petter Doe'}
            profileImageUrl={TEST_IMAGE_URL}
            profileDescription={
              'M.F is a project that is activated, throughout the collection, around the magic number 108, which suggests that we face human karma.'
            }
          />
          <div className="flex-col-center">
            <DescriptionSticker
              title={'For Sale'}
              data={'123'}
              type={'PRIMARY'}
            />
            <DescriptionSticker title={'Owned'} data={'64'} type={'PRIMARY'} />
          </div>
        </div>

        <h1>Your statistics</h1>
        <div className={classNames('grid-container')}>
          <DescriptionSticker
            title={'Solana'}
            data={'64 SOL'}
            type={'SECONDARY'}
          />
          <DescriptionSticker
            title={'Solana'}
            data={'64 SOL'}
            type={'SECONDARY'}
          />
          <DescriptionSticker
            title={'Solana'}
            data={'64 SOL'}
            type={'SECONDARY'}
          />
          <DescriptionSticker
            title={'Solana'}
            data={'64 SOL'}
            type={'SECONDARY'}
          />
          <DescriptionSticker
            title={'Solana'}
            data={'64 SOL'}
            type={'SECONDARY'}
          />
          <DescriptionSticker
            title={'Solana'}
            data={'64 SOL'}
            type={'SECONDARY'}
          />
          <DescriptionSticker
            title={'Solana'}
            data={'64 SOL'}
            type={'SECONDARY'}
          />
          <DescriptionSticker
            title={'Solana'}
            data={'64 SOL'}
            type={'SECONDARY'}
          />
          <DescriptionSticker
            title={'Solana'}
            data={'64 SOL'}
            type={'SECONDARY'}
          />
          <DescriptionSticker
            title={'Solana'}
            data={'64 SOL'}
            type={'SECONDARY'}
          />
          <DescriptionSticker
            title={'Solana'}
            data={'64 SOL'}
            type={'SECONDARY'}
          />
          <DescriptionSticker
            title={'Solana'}
            data={'64 SOL'}
            type={'SECONDARY'}
          />
          <DescriptionSticker
            title={'Solana'}
            data={'64 SOL'}
            type={'SECONDARY'}
          />
          <DescriptionSticker
            title={'Solana'}
            data={'64 SOL'}
            type={'SECONDARY'}
          />
          <DescriptionSticker
            title={'Solana'}
            data={'64 SOL'}
            type={'SECONDARY'}
          />
        </div>
        <Tabs
          options={options}
          selected={selected}
          handleChange={setSelected}
        />
        <div className="flex-row-start">
          {ProfileMockNFTS.map((nft, index) => {
            if (nft.status === options[selected]) {
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
    </BasePage>
  );
};

export default ProfilePage;
