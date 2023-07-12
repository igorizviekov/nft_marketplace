import { useStoreActions, useStoreState } from '../../../store';
import Image from 'next/image';
import styles from './NFTCard.module.scss';
import { toast } from 'react-toastify';
import Icon from '../Icon/Icon';
import { FaArrowRight, FaEthereum } from 'react-icons/fa';
import { INftCardProps } from './NFTCard.types';
import { useRouter } from 'next/router';
import BaseImage from '../Base/BaseImage/BaseImage';
import Shimmer from '../../../assets/icons/network-icons/Shimmer';
import Ethereum from '../../../assets/icons/network-icons/Ethereum';

export const NftCard = ({ nft }: INftCardProps) => {
  const { currency } = useStoreState((state) => state.wallet);
  const { isOwnedNFTSLoading } = useStoreState((state) => state.profile);
  const { selectedBlockchain } = useStoreState((state) => state.app);
  const { setNFT } = useStoreActions((actions) => actions.nftView);
  const router = useRouter();

  const handleClick = () => {
    if (nft) setNFT(nft);

    router.push(`/nft/${nft?.contract.address}`);
  };

  return (
    <>
      {selectedBlockchain?.currency_symbol === 'ETH' && !isOwnedNFTSLoading && (
        <div className={styles.card}>
          <div className={styles.image}>
            {nft?.media[0]?.gateway && (
              <Image
                src={nft?.media[0].thumbnail as string}
                alt="nft"
                fill
                sizes="(max-width: 768px) 100vw,
            (max-width: 1200px) 50vw,
            33vw"
                style={{
                  objectFit: 'cover',
                }}
              />
            )}
          </div>
          <div className={styles.text}>
            <div className={styles.name}>
              <h2>
                {nft?.title
                  ? nft.title
                  : `${nft?.contract.openSea?.collectionName} #${nft?.tokenId}`}
              </h2>
              <p
                className={styles.collectionName}
                onClick={() => toast.warn('OpenCollection')}
              >
                {nft?.contract.openSea?.collectionName}
              </p>
            </div>
            <div className={styles.bottom}>
              <div className={styles.price}>
                <Icon icon={<Ethereum className={styles.icon} />} />
                <h2>{nft?.contract.openSea?.floorPrice}</h2>
              </div>
              <div className={styles.arrow} onClick={handleClick}>
                <p>View</p>
                <Icon
                  icon={
                    <FaArrowRight style={{ width: '14px', height: '14px' }} />
                  }
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
