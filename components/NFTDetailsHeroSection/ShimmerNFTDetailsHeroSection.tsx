import React from 'react';
import { formatAddress } from '../BaseTable/TableBodies/ActivityBody/utils';
import { BsChevronDown } from 'react-icons/bs';
import Icon from '../ui/Icon/Icon';
import BaseImage from '../ui/Base/BaseImage/BaseImage';
import BaseLink from '../ui/Base/BaseLink/BaseLink';
import { Accordion } from 'react-accordion-ts';
import styles from '../../styles/pages/NFTPage.module.scss';
import classNames from 'classnames';
import { IShimmerNFT } from '../ui/NFTCard/ShimmerNFTCard.types';
import { refactorAttributeDate } from '../../utils/NFTViewUtils';
import DescriptionSticker from '../DescriptionSticker/DescriptionSticker';

const ShimmerNFTDetailsHeroSection = ({ nft }: { nft: IShimmerNFT }) => {
  const collectionDescription = [
    {
      title: (
        <div className={styles.title}>
          <h2>{`About`}</h2>
          <Icon icon={<BsChevronDown />} />
        </div>
      ),
      content: (
        <div className={styles.filter}>
          <p>{nft?.metadata.description}</p>
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
            nft.metadata.traits.map((attribute: any, index: number) => (
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
            <p>Contract Address</p>
            <p>Token ID</p>
            <p>Token Standard</p>
            <p>Owner</p>
            {nft.metadata.royalty && <p>Royalty</p>}
          </div>
          <div>
            <p>{formatAddress(nft.owner)}</p>
            <p>{formatAddress(nft.owner)}</p>
            <p>{nft.metadata.name}</p>
            <p>{formatAddress(nft.owner)}</p>
            <p>{nft.metadata.royalty && nft.metadata.royalty}</p>
          </div>
        </div>
      ),
    },
  ];
  return (
    <div className={styles.hero}>
      <div className={styles.image}>
        <BaseImage imageUrl={nft.metadata.image} />
      </div>
      <div className={classNames(styles.textContainer, 'flex-col-start')}>
        <h1>{`${nft.metadata.name}`}</h1>
        <BaseLink href={''}>
          <p>{nft.metadata.description}</p>
        </BaseLink>
        <div className={styles.price}>
          <h2>{nft.metadata.price}</h2>
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

export default ShimmerNFTDetailsHeroSection;
