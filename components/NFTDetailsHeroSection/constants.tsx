import { BsChevronDown } from 'react-icons/bs';
import styles from '../../styles/pages/NFTPage.module.scss';
import { IShimmerNFT } from '../ui/NFTCard/ShimmerNFTCard.types';
import Icon from '../ui/Icon/Icon';
import DescriptionSticker from '../DescriptionSticker/DescriptionSticker';
import { refactorAttributeDate } from '../../utils/NFTViewUtils';
import { formatAddress } from '../BaseTable/TableBodies/ActivityBody/utils';

export const collectionDescription = (nft: IShimmerNFT) => {
  return [
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
          {nft.metadata.traits &&
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
};
