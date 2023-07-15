import React, { useEffect, useMemo, useState } from 'react';
import BaseImage from '../ui/Base/BaseImage/BaseImage';
import { Accordion } from 'react-accordion-ts';
import styles from '../../styles/pages/NFTPage.module.scss';
import classNames from 'classnames';
import { IShimmerNFT } from '../ui/NFTCard/ShimmerNFTCard.types';
import { useStoreState } from '../../store';
import { Button } from '../ui/Button';
import { collectionDescription } from './constants';
import useListNFT from '../../service/nft/useListNFT';
import isListed from '../../service/nft/isListed';
import useDelistNFT from '../../service/nft/useDelistNFT';
import { ethers } from 'ethers';
import { MarketplaceABI, marketplaceAddress } from '../../mocks/constants.mock';

const ShimmerNFTDetailsHeroSection = ({ nft }: { nft: IShimmerNFT }) => {
  const { activeWallet } = useStoreState((state) => state.wallet);
  const isOwner = activeWallet === nft.owner.toLowerCase();
  const [listedNFT, setListedNFT] = useState<boolean>(false);

  const provider = useMemo(
    () =>
      new ethers.providers.JsonRpcProvider(
        'https://json-rpc.evm.testnet.shimmer.network'
      ),
    []
  );
  const marketplaceContract = useMemo(() => {
    return new ethers.Contract(marketplaceAddress, MarketplaceABI, provider);
  }, []);

  useEffect(() => {
    const getIsListed = async () => {
      const tx = await isListed(nft.id, marketplaceContract);
      setListedNFT(tx);
    };

    try {
      getIsListed();
    } catch (err) {
      console.log(err);
    }
  }, [useDelistNFT, useListNFT]);

  console.log(listedNFT);
  return (
    <div className={styles.hero}>
      <div className={styles.image}>
        <BaseImage imageUrl={nft.metadata.image} />
      </div>
      <div className={classNames(styles.textContainer, 'flex-col-start')}>
        <div className={styles.top}>
          <div className={styles.text}>
            <h1>{`${nft.metadata.name}`}</h1>
            <p>{nft.metadata.description}</p>
            <div className={styles.price}>
              <h2>{nft.metadata.price}</h2>
            </div>
          </div>
          <div>
            {isOwner && listedNFT ? (
              <Button
                isPrimary={true}
                label={'De list NFT'}
                onClick={() => useDelistNFT(nft.id, setListedNFT)}
              />
            ) : (
              !listedNFT && (
                <Button
                  isPrimary={true}
                  label={'List NFT'}
                  onClick={() => useListNFT(nft.id, 500, setListedNFT)}
                />
              )
            )}
          </div>
        </div>
        <div className={styles.wrapper}>
          <Accordion
            items={collectionDescription(nft)}
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
