import { useStoreActions, useStoreState } from '../../../store';
import Image from 'next/image';
import { IStoreModel } from '../../../store/model/model.types';
import styles from './NFTCard.module.scss';
import { toast } from 'react-toastify';
import Icon from '../Icon/Icon';
import { FaArrowRight, FaEthereum } from 'react-icons/fa';
import { INftCardProps } from './NFTCard.types';
import { useRouter } from 'next/router';

export const NftCard = ({
  name,
  owner,
  img,
  price,
  seller,
  tokenId,
  collectionName,
  description,
  address,
  traits,
}: INftCardProps) => {
  const { currency } = useStoreState((state) => state.wallet);
  const { nft } = useStoreState((state) => state.nftView);
  const { setNFT } = useStoreActions((actions) => actions.nftView);
  const router = useRouter();

  const handleClick = () => {
    setNFT({
      name: name,
      owner: owner,
      img: img,
      description: description,
      tokenId: tokenId,
      collectionName: collectionName,
      price: price,
      seller: seller,
      traits: traits,
    });

    router.push(`/nft/${address}`);
  };
  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <Image
          src={img}
          alt="nft"
          fill
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          style={{
            objectFit: 'cover',
          }}
        />
      </div>
      <div className={styles.text}>
        <div className={styles.name}>
          <h2>{name}</h2>
          <p
            className={styles.collectionName}
            onClick={() => toast.warn('OpenCollection')}
          >
            {collectionName}
          </p>
        </div>
        <div className={styles.bottom}>
          <div className={styles.price}>
            <Icon icon={<FaEthereum />} />
            <h2>{Number(price)}</h2>
          </div>
          <div className={styles.arrow} onClick={handleClick}>
            <p>View</p>
            <Icon
              icon={<FaArrowRight style={{ width: '14px', height: '14px' }} />}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
