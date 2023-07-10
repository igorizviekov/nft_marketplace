import React from 'react';
import { formatAddress } from '../BaseTable/TableBodies/ActivityBody/utils';
import { BsChevronDown } from 'react-icons/bs';
import Icon from '../ui/Icon/Icon';
import { refactorAttributeDate } from '../../utils/NFTViewUtils';
import DescriptionSticker from '../DescriptionSticker/DescriptionSticker';
import BaseImage from '../ui/Base/BaseImage/BaseImage';
import BaseLink from '../ui/Base/BaseLink/BaseLink';
import { Accordion } from 'react-accordion-ts';
import styles from '../../styles/pages/NFTPage.module.scss';
import classNames from 'classnames';
import { OwnedNft } from 'alchemy-sdk';

const NFTDetailsHeroSection = ({ nft }: { nft: OwnedNft }) => {
  console.log(nft);
  const collectionDescription = [
    {
      title: (
        <div className={styles.title}>
          <h2>{`About ${nft?.contract.openSea?.collectionName}`}</h2>
          <Icon icon={<BsChevronDown />} />
        </div>
      ),
      content: (
        <div className={styles.filter}>
          <p>{nft?.contract.openSea?.description}</p>
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
            nft.rawMetadata?.attributes?.map(
              (attribute: any, index: number) => (
                <DescriptionSticker
                  key={index}
                  title={attribute.trait_type}
                  data={refactorAttributeDate(attribute)}
                  type={'PRIMARY'}
                  givenClassName={styles.sticker}
                />
              )
            )}
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
                <p>{formatAddress(nft?.tokenId)}</p>
              </>
            )}
            <p>{nft?.tokenType}</p>
            <p>
              {nft?.contract.contractDeployer
                ? nft.contract.contractDeployer
                : 'no-owner'}
            </p>
            <p>{nft?.description ? nft.description : '0'}</p>
          </div>
        </div>
      ),
    },
  ];
  return (
    <div className={styles.hero}>
      <div className={styles.image}>
        <BaseImage imageUrl={nft?.media[0].gateway} />
      </div>
      <div className={classNames(styles.textContainer, 'flex-col-start')}>
        <h1>{`${nft?.contract.openSea?.collectionName} #${nft?.tokenId}`}</h1>
        <BaseLink href={''}>
          <p>{nft?.description}</p>
        </BaseLink>
        <div className={styles.price}>
          <h2>{nft?.contract.openSea?.floorPrice}</h2>
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
  );
};

export default NFTDetailsHeroSection;
