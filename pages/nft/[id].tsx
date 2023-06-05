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
import { refactorAttributeDate } from '../../utils/NFTViewUtils';
import { formatAddress } from '../../components/BaseTable/TableBodies/ActivityBody/utils';
import { useStoreRehydrated } from 'easy-peasy';

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

  const isRehydrated = useStoreRehydrated();
  const { nft } = useStoreState((state) => state.nftView);

  const collectionDescription = [
    {
      title: (
        <div className={styles.title}>
          <h2>{`About ${nft?.contractMetadata.openSea.collectionName}`}</h2>
          <Icon icon={<BsChevronDown />} />
        </div>
      ),
      content: (
        <div className={styles.filter}>
          <p>{nft?.contractMetadata.openSea.description}</p>
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
            nft.metadata.attributes.map((attribute, index) => (
              <DescriptionSticker
                key={index}
                title={attribute.trait_type}
                data={refactorAttributeDate(attribute)}
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
            {nft?.contract.address && (
              <>
                <p>Contract Address</p>
                <p>Token ID</p>
              </>
            )}
            <p>Token Standard</p>
            <p>Owner</p>
            <p>Royalty</p>
          </div>
          <div>
            {nft?.contract.address && (
              <>
                <p>{formatAddress(nft?.contract.address)}</p>
                <p>{formatAddress(nft?.id.tokenId)}</p>
              </>
            )}
            <p>{nft?.id.tokenMetadata.tokenType}</p>
            <p>{nft?.owner ? nft.owner : 'no-owner'}</p>
            <p>{nft?.royalty ? nft.royalty : '0'}</p>
          </div>
        </div>
      ),
    },
  ];
  return (
    <BasePage>
      {isRehydrated && (
        <>
          <div className={styles.hero}>
            <div className={styles.image}>
              <BaseImage imageUrl={nft?.contractMetadata.openSea.imageUrl} />
            </div>
            <div className={classNames(styles.textContainer, 'flex-col-start')}>
              <h1>{nft?.title}</h1>
              <BaseLink href={''}>
                <p>{nft?.description}</p>
              </BaseLink>
              <div className={styles.price}>
                <h2>{nft?.contractMetadata.openSea.floorPrice}</h2>
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
        </>
      )}
    </BasePage>
  );
};

export default NFTPage;
