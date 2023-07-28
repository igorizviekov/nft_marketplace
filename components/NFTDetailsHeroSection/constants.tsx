import { BsChevronDown } from 'react-icons/bs';
import styles from '../../styles/pages/NFTPage.module.scss';
import { IShimmerNFT } from '../ui/NFTCard/ShimmerNFTCard.types';
import Icon from '../ui/Icon/Icon';
import DescriptionSticker from '../DescriptionSticker/DescriptionSticker';
import { refactorAttributeDate } from '../../utils/NFTViewUtils';
import { formatAddress } from '../BaseTable/TableBodies/ActivityBody/utils';
import BaseLink from '../ui/Base/BaseLink/BaseLink';

export const collectionDescription = (nft: IShimmerNFT) => {
  return [
    {
      title: (
        <div className={styles.title}>
          <h2>{`About ${nft.metadata.collection?.name}`}</h2>
          <Icon icon={<BsChevronDown />} />
        </div>
      ),
      content: (
        <div className={styles.description}>
          <div className={styles.item}>
            <h3>Description:</h3>
            <p>{nft?.metadata.collection?.description}</p>
          </div>
          <div className={styles.item}>
            <h3>Symbol:</h3>
            <p>{nft?.metadata.collection?.symbol}</p>
          </div>
          <div className={styles.item}>
            <h3>Collections ID:</h3>
            <p>{nft?.metadata.collection?.id}</p>
          </div>
          <div className={styles.item}>
            <h3>Contract Address:</h3>
            <p>{nft?.metadata.collection?.contract_address}</p>
          </div>
          <div className={styles.item}>
            <h3>Category Primary:</h3>
            <p>{nft?.metadata.collection?.category_primary}</p>
          </div>
          <div className={styles.item}>
            <h3>Category Secondary:</h3>
            <p>{nft?.metadata.collection?.category_secondary}</p>
          </div>
          {nft.metadata.collection?.website && (
            <div className={styles.item}>
              <h3>Website:</h3>
              <BaseLink href={`https://${nft?.metadata.collection?.website}`}>
                {nft?.metadata.collection?.website}
              </BaseLink>
            </div>
          )}
        </div>
      ),
    },
    {
      title: (
        <>
          {nft.metadata.traits && (
            <div className={styles.title}>
              <h2>{'Attributes'}</h2>
              <Icon icon={<BsChevronDown />} />
            </div>
          )}
        </>
      ),
      content: (
        <>
          {nft.metadata.traits && (
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
          )}
        </>
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
            {nft.metadata.collection?.contract_address && (
              <p>Contract Address</p>
            )}
            <p>Token ID</p>
            <p>Token Standard</p>
            <p>Owner</p>
            {nft.metadata.royalty && <p>Royalty</p>}
          </div>
          <div className="text-end">
            {nft.metadata.collection?.contract_address && (
              <p>{formatAddress(nft.metadata.collection.contract_address)}</p>
            )}
            <p>{nft.id}</p>
            <p>{nft.metadata.tokenStandard}</p>
            <p>{formatAddress(nft.owner)}</p>
            <p>{nft.metadata.royalty && nft.metadata.royalty}</p>
          </div>
        </div>
      ),
    },
  ];
};
