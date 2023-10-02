import React, { useEffect, useState } from 'react';
import BaseImage from '../ui/Base/BaseImage/BaseImage';
import { Accordion } from 'react-accordion-ts';
import styles from '../../styles/pages/NFTPage.module.scss';
import classNames from 'classnames';
import { IShimmerNFT } from '../ui/NFTCard/ShimmerNFTCard.types';
import { useStoreState, useStoreActions } from '../../store';
import { Button } from '../ui/Button';
import { collectionDescription } from './constants';
import useListNFT from '../../service/nft/useListNFT';
import isListed from '../../service/nft/isListed';
import useDelistNFT from '../../service/nft/useDelistNFT';
import Input from '../ui/Input';
import { validatePrice } from '../ui/Input/utils';

const ShimmerNFTDetailsHeroSection = ({ nft }: { nft: IShimmerNFT }) => {
  const { activeWallet } = useStoreState((state) => state.wallet);
  const { isListedLoading } = useStoreState((state) => state.nftView);
  const { setIsListedLoading } = useStoreActions((actions) => actions.nftView);
  const isOwner = activeWallet === nft.owner.toLowerCase();
  const [listedNFT, setListedNFT] = useState<boolean>(false);
  const [price, setPrice] = useState<number>(0);

  useEffect(() => {
    setIsListedLoading(true);

    const getIsListed = async () => {
      const tx = await isListed(nft.id);
      setListedNFT(tx);
      setIsListedLoading(false);
    };

    try {
      getIsListed();
    } catch (err) {
      console.log(err);
    } finally {
      setIsListedLoading(false);
    }
  }, [useDelistNFT, useListNFT]);

  return (
    <div className={styles.hero}>
      <div className={styles.image}>
        {nft.metadata && <BaseImage imageUrl={nft.metadata.image} />}
      </div>
      <div className={classNames(styles.textContainer, 'flex-col-start')}>
        <div className={styles.top}>
          <div className={styles.text}>
            <h1>{`${nft.metadata.name}`}</h1>
            <p>{nft.metadata.description}</p>
            <div className={styles.price}>
              <h2>Price: {nft.metadata.price}</h2>
            </div>
          </div>
          <div>
            {isOwner && listedNFT ? (
              <Button
                isPrimary={true}
                disabled={isListedLoading}
                label={'De list NFT'}
                onClick={() =>
                  useDelistNFT(nft.id, setListedNFT, setIsListedLoading)
                }
              />
            ) : (
              !listedNFT && (
                <div className={styles.listButton}>
                  <Input
                    inputType={'number'}
                    title={'New Price'}
                    placeholder={'0'}
                    id={'price'}
                    value={price > 0 ? price : ''}
                    handleChange={(e) =>
                      setPrice(Number((e.target as HTMLInputElement).value))
                    }
                  />
                  <Button
                    isPrimary={true}
                    disabled={isListedLoading || price <= 0}
                    label={'List NFT'}
                    onClick={() =>
                      useListNFT(
                        nft.id,
                        price,
                        nft.metadata.collection?.contract_address,
                        setListedNFT,
                        setIsListedLoading
                      )
                    }
                  />
                </div>
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
