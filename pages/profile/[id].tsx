import React from 'react';
import DescriptionSticker from '../../components/DescriptionSticker/DescriptionSticker';
import classNames from 'classnames';
import { Tabs } from '../../components/ui/Tabs/Tabs';
import BasePage from '../../components/ui/Base/BasePage/BasePage';
import ProfileImage from '../../components/ui/ProfileImage/ProfileImage';
import { TEST_IMAGE_URL } from '../../components/ui/Base/BaseImage/BaseImage';

const ProfilePage = () => {
  return (
    <BasePage>
      <div className={'section'}>
        <div className="flex-row-center">
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
              'M.F is a project that is activated, throughout the collection, around the magic number 108, which suggests that we face human karma. M.F is a project that is activated, throughout the collection, around the magic number 108, which suggests that we face human karma. '
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
          options={['Outfoing Offers', 'Incoming Offers']}
          selected={0}
          handleChange={function (index: number): void {
            throw new Error('Function not implemented.');
          }}
        />
      </div>
    </BasePage>
  );
};

export default ProfilePage;
