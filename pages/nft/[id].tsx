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
import { useStoreState } from '../../store';
import { INFTLog } from '../../store/model/profile/profile.types';
import Icon from '../../components/ui/Icon/Icon';
import { BsChevronDown } from 'react-icons/bs';
import DescriptionSticker from '../../components/DescriptionSticker/DescriptionSticker';

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

  const { nft } = useStoreState((state) => state.nftView);
  console.log(nft);

  const collectionDescription = [
    {
      title: (
        <div className={styles.title}>
          <h2>{'About Rusty Robots Country Club'}</h2>
          <Icon icon={<BsChevronDown />} />
        </div>
      ),
      content: (
        <div className={styles.filter}>
          <p>
            Attention all traders! Phoenix Mint is now live and ready for you to
            start trading NFTs. Don't miss out on this opportunity to own unique
            digital assets for a fraction of the cost. Start trading today at
            unbeatable prices! #NFT #PhoenixMint #CryptoTrading
          </p>
        </div>
      ),
    },
    {
      title: (
        <div className={styles.title}>
          <h2>{'Attributes'}</h2>
          <Icon icon={<BsChevronDown />} />
        </div>
      ),
      content: (
        <div className={styles.filter}>
          {nft &&
            nft.traits.map((attribute, index) => (
              <DescriptionSticker
                key={index}
                title={attribute.trait_type}
                data={attribute.value}
                type={'PRIMARY'}
                givenClassName={styles.sticker}
              />
            ))}
        </div>
      ),
    },
    {
      title: (
        <div className={styles.title}>
          <h2>{'Details'}</h2>
          <Icon icon={<BsChevronDown />} />
        </div>
      ),
      content: (
        <div className={styles.filter}>
          <div>
            <p>Contract Address</p>
            <p>Token ID</p>
            <p>Token Standard</p>
            <p>Owner</p>
            <p>Royalty</p>
          </div>
          <div>
            <p>0x633...144</p>
            <p>13633 </p>
            <p>ERC721</p>
            <p>0x4bb...db7</p>
            <p>2.5%</p>
          </div>
        </div>
      ),
    },
  ];
  return (
    <BasePage>
      <div className={styles.hero}>
        <div className={styles.image}>
          <BaseImage imageUrl={nft.img} />
        </div>
        <div className={classNames(styles.textContainer, 'flex-col-start')}>
          <h1>{nft.name}</h1>
          <BaseLink href={''}>
            <p>{nft.collectionName}</p>
          </BaseLink>
          <div className={styles.price}>
            <h2>{nft.price}</h2>
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
