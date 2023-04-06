import React from 'react';
import DescriptionSticker from '../../components/DescriptionSticker/DescriptionSticker';
import classNames from 'classnames';

const ProfilePage = () => {
  return (
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
        <div>
          <p>Image</p>
        </div>
        <div className="flex-col-center">
          <DescriptionSticker
            title={'For Sale'}
            data={'123'}
            type={'PRIMARY'}
          />
          <DescriptionSticker title={'Owned'} data={'64'} type={'PRIMARY'} />
        </div>
      </div>

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
      </div>
    </div>
  );
};

export default ProfilePage;
