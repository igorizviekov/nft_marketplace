import React from 'react';
import BasePage from '../../components/ui/Base/BasePage/BasePage';
import styles from '../../styles/pages/NFTPage.module.scss';
import BaseImage from '../../components/ui/Base/BaseImage/BaseImage';
import classNames from 'classnames';
import BaseLink from '../../components/ui/Base/BaseLink/BaseLink';
import BaseTable from '../../components/BaseTable/BaseTable';
import ActivityBody from '../../components/BaseTable/TableBodies/ActivityBody/ActivityBody';
import { Accordion } from 'react-accordion-ts';
import 'react-accordion-ts/src/panel.css';
import { collectionDescription } from './items';
import { nftData } from './items';
import { useStoreState } from '../../store';
import { INFTLog } from '../../store/model/profile/profile.types';

const NFTPage = () => {
  const mockNFTLogs: INFTLog[] = [
    {
      id: '1f7fc062-e508-43c3-be1a-cee1a5eb91d0',
      image_uri: 'string',
      nft_id: '1023',
      transaction_type: 'listing',
      seller_address: '',
      buyer_address: '0xa3de3788307a25f76815edde4776e7c1d25a3684',
      token_value: 20,
      date: new Date('2023-02-12T21:12:00.000Z'),
    },
    {
      id: '1f7fc062-e508-43c3-be1a-cee1a5eb91d0',
      image_uri: 'string',
      nft_id: '1023',
      transaction_type: 'listing',
      seller_address: '',
      buyer_address: '0xa3de3788307a25f76815edde4776e7c1d25a3684',
      token_value: 20,
      date: new Date('2023-02-12T21:12:00.000Z'),
    },
    {
      id: '1f7fc062-e508-43c3-be1a-cee1a5eb91d0',
      image_uri: 'string',
      nft_id: '1023',
      transaction_type: 'listing',
      seller_address: '',
      buyer_address: '0xa3de3788307a25f76815edde4776e7c1d25a3684',
      token_value: 20,
      date: new Date('2023-02-12T21:12:00.000Z'),
    },
    {
      id: '1f7fc062-e508-43c3-be1a-cee1a5eb91d0',
      image_uri: 'string',
      nft_id: '1023',
      transaction_type: 'listing',
      seller_address: '',
      buyer_address: '0xa3de3788307a25f76815edde4776e7c1d25a3684',
      token_value: 20,
      date: new Date('2023-02-12T21:12:00.000Z'),
    },
    {
      id: '1f7fc062-e508-43c3-be1a-cee1a5eb91d0',
      image_uri: 'string',
      nft_id: '1023',
      transaction_type: 'listing',
      seller_address: '',
      buyer_address: '0xa3de3788307a25f76815edde4776e7c1d25a3684',
      token_value: 20,
      date: new Date('2023-02-12T21:12:00.000Z'),
    },
  ];
  return (
    <BasePage>
      <div className={styles.hero}>
        <div className={styles.image}>
          <BaseImage />
        </div>
        <div className={classNames(styles.textContainer, 'flex-col-start')}>
          <h1>{nftData.name}</h1>
          <BaseLink href={''}>
            <p>Rusty Robots Country Club</p>
          </BaseLink>
          <div className={styles.price}>
            <h2>
              {nftData.price} {nftData.currency}
            </h2>
          </div>

          <div className={styles.wrapper}>
            <Accordion
              items={collectionDescription}
              open={2}
              duration={200}
              multiple={true}
            />
          </div>
        </div>
      </div>
      <BaseTable
        body={<ActivityBody activities={mockNFTLogs} />}
        header={[
          'NFT Details',
          'Transaction',
          'Seller',
          'Buyer',
          'Date',
          'Total',
        ]}
      />
    </BasePage>
  );
};

export default NFTPage;
