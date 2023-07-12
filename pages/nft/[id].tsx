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
import NFTDetailsHeroSection from '../../components/NFTDetailsHeroSection/NFTDetailsHeroSection';
import ShimmerNFTDetailsHeroSection from '../../components/NFTDetailsHeroSection/ShimmerNFTDetailsHeroSection';
import { OwnedNft } from 'alchemy-sdk';
import { IShimmerNFT } from '../../components/ui/NFTCard/ShimmerNFTCard.types';

const NFTPage = () => {
  const { selectedBlockchain } = useStoreState((state) => state.app);
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

  return (
    <BasePage>
      {isRehydrated && (
        <>
          {selectedBlockchain?.currency_symbol !== 'SMR' ? (
            <NFTDetailsHeroSection nft={nft as OwnedNft} />
          ) : (
            <ShimmerNFTDetailsHeroSection nft={nft as IShimmerNFT} />
          )}
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
