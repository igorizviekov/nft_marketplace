import { BsChevronDown } from 'react-icons/bs';
import styles from '../styles/pages/NFTPage.module.scss';
import Icon from '../components/ui/Icon/Icon';
import DescriptionSticker from '../components/DescriptionSticker/DescriptionSticker';

export const nftData = {
  address: '0xA3de3788307a25F76815EddE4776e7C1d25A3684',
  image: 'asd',
  price: 10,
  currency: 'ETH',
  name: 'Rusty Robots Country Club #1010',
  description:
    "Attention all traders! Phoenix Mint is now live and ready for you to start trading NFTs. Don't miss out on this opportunity to own unique digital assets for a fraction of the cost. Start trading today at unbeatable prices! #NFT #PhoenixMint #CryptoTrading",
  website: 'wenste.com',
  collection: 'name',
  attributes: [
    { type: 'background', value: 'red' },
    { type: 'hat', value: 'cowboy' },
    { type: 'eyes', value: 'twister' },
    { type: 'nose', value: 'with a large id' },
    { type: 'chest', value: 'even larger this time' },
    { type: 'earing', value: 'cross' },
  ],
};
export const collectionDescription = [
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
        {nftData &&
          nftData.attributes.map((attribute, index) => (
            <DescriptionSticker
              key={index}
              title={attribute.type}
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
