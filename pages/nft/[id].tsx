import React from 'react';
import BasePage from '../../components/ui/Base/BasePage/BasePage';
import BaseTable from '../../components/BaseTable/BaseTable';
import ActivityBody from '../../components/BaseTable/TableBodies/ActivityBody/ActivityBody';
import 'react-accordion-ts/src/panel.css';
import { useStoreState } from '../../store';
import { INFTLog } from '../../store/model/profile/profile.types';
import { useStoreRehydrated } from 'easy-peasy';
import NFTDetailsHeroSection from '../../components/NFTDetailsHeroSection/NFTDetailsHeroSection';
import ShimmerNFTDetailsHeroSection from '../../components/NFTDetailsHeroSection/ShimmerNFTDetailsHeroSection';
import { OwnedNft } from 'alchemy-sdk';
import { IShimmerNFT } from '../../components/ui/NFTCard/ShimmerNFTCard.types';
import { TEST_IMAGE_URL } from '../../components/ui/Base/BaseImage/BaseImage';

const NFTPage = () => {
  const { selectedBlockchain } = useStoreState((state) => state.app);
  const mockNFTLogs: INFTLog[] = [
    {
      id: '1f7fc062-e508-43c3-be1a-cee1a5eb91d0',
      image_uri: TEST_IMAGE_URL,
      nft_id: '102',
      transaction_type: 'listing',
      seller_address: '',
      buyer_address: '0xa3de3788307a25f76815edde4776e7c1d25a3684',
      token_value: 20,
      date: new Date('2023-02-12T21:12:00.000Z'),
    },
    {
      id: '1f7fc062-e508-43c3-be1a-cee1a5eb91d0',
      image_uri: TEST_IMAGE_URL,
      nft_id: '102',
      transaction_type: 'listing',
      seller_address: '',
      buyer_address: '0xa3de3788307a25f76815edde4776e7c1d25a3684',
      token_value: 20,
      date: new Date('2023-02-12T21:12:00.000Z'),
    },
    {
      id: '1f7fc062-e508-43c3-be1a-cee1a5eb91d0',
      image_uri: TEST_IMAGE_URL,
      nft_id: '12',
      transaction_type: 'listing',
      seller_address: '',
      buyer_address: '0xa3de3788307a25f76815edde4776e7c1d25a3684',
      token_value: 20,
      date: new Date('2023-02-12T21:12:00.000Z'),
    },
    {
      id: '1f7fc062-e508-43c3-be1a-cee1a5eb91d0',
      image_uri: TEST_IMAGE_URL,
      nft_id: '12',
      transaction_type: 'listing',
      seller_address: '',
      buyer_address: '0xa3de3788307a25f76815edde4776e7c1d25a3684',
      token_value: 20,
      date: new Date('2023-02-12T21:12:00.000Z'),
    },
    {
      id: '1f7fc062-e508-43c3-be1a-cee1a5eb91d0',
      image_uri: TEST_IMAGE_URL,
      nft_id: '12',
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
