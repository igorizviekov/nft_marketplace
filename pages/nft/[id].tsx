import React from 'react';
import BasePage from '../../components/ui/Base/BasePage/BasePage';
import styles from '../../styles/pages/NFTPage.module.scss';
import BaseImage from '../../components/ui/Base/BaseImage/BaseImage';
import classNames from 'classnames';
import DescriptionSticker from '../../components/DescriptionSticker/DescriptionSticker';
import BaseLink from '../../components/ui/Base/BaseLink/BaseLink';
import BaseTable from '../../components/BaseTable/BaseTable';
import ActivityBody from '../../components/BaseTable/TableBodies/ActivityBody/ActivityBody';
const NFTPage = () => {
  const nftData = {
    image: 'asd',
    name: 'Name',
    description: 'description',
    website: 'wenste.com',
    collection: 'name',
  };
  return (
    <BasePage>
      <div className={styles.hero}>
        <div className={styles.image}>
          <BaseImage />
        </div>
        <div className={classNames(styles.textContainer, 'flex-col-start')}>
          <div className={styles.icons}>
            <h1 className={styles.name}>{nftData.name}</h1>
          </div>
          <p>{nftData.description}</p>
          <BaseLink href={nftData.website} isExternal>
            {nftData.website}
          </BaseLink>
          <div className={styles.stickersContainer}>
            <DescriptionSticker
              title={'Total Volume'}
              data={'123'}
              type={'PRIMARY'}
            />
            <DescriptionSticker
              title={'Avg. Sale'}
              data={'12'}
              type={'PRIMARY'}
            />
            <DescriptionSticker
              title={'Owners'}
              data={'123'}
              type={'SECONDARY'}
            />
            <DescriptionSticker
              title={'Total Supply'}
              data={'12'}
              type={'SECONDARY'}
            />
          </div>
        </div>
      </div>
      <BaseTable
        body={<ActivityBody activities={[]} />}
        header={['NFT Details', 'Transaction', 'Seller', 'Buyer', 'Total']}
      />
    </BasePage>
  );
};

export default NFTPage;
