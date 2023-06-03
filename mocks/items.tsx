import { BsChevronDown } from 'react-icons/bs';
import styles from '../styles/pages/NFTPage.module.scss';
import Icon from '../components/ui/Icon/Icon';
import DescriptionSticker from '../components/DescriptionSticker/DescriptionSticker';
import { useStoreState } from '../store';

export const collectionDescription = () => {
  const { nft } = useStoreState((state) => state.nftView);
  return [
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
};
