import { useStoreState } from 'easy-peasy';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { IStoreModel } from '../../../store/model/model.types';
import styles from './NFTCard.module.scss';
import { toast } from 'react-toastify';
import Icon from '../Icon/Icon';
import {
  FaArrowAltCircleRight,
  FaArrowRight,
  FaEthereum,
} from 'react-icons/fa';
export interface INftCardProps {
  name: string;
  seller: string;
  owner: string;
  description: string;
  img: StaticImageData | string;
  price: number;
  tokenId: number;
  nickname?: string;
  avatar?: string;
  status?: NFTStatus;
  traits?: ITraits[];
}
export interface ITraits {
  trait_type: string;
  value: string;
}
type NFTStatus =
  | 'On Sale'
  | 'Created'
  | 'My NTFs'
  | 'Liked'
  | 'Activity'
  | 'Outgoing Offers'
  | 'Incoming Offers';

export const NftCard = ({
  name,
  owner,
  img,
  price,
  seller,
  tokenId,
  description,
  nickname,
}: INftCardProps) => {
  const walletState = useStoreState((state: IStoreModel) => state.wallet);
  const { currency } = walletState;

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
            {'Collection Name'}
          </p>
        </div>
        <div className={styles.bottom}>
          <div className={styles.price}>
            <Icon icon={<FaEthereum />} />
            <h2>{Number(price).toFixed(2)}</h2>
          </div>
          <div className={styles.arrow}>
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
