import { useStoreState } from 'easy-peasy';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Spinner } from '../../components/spinner';
import { INftCardProps } from '../../components/ui/nft-card';
import { IStoreModel } from '../../store/model/model.types';
import Image from 'next/image';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/modal';
import PaymentBody from '../../components/payment-body';
import { ButtonGroup } from '../../components/ui/ButtonGroup';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import { fetchContract } from '../../utils';
import { toast } from 'react-toastify';

const NFTDetails = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState<boolean | string>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean | string>(false);
  const [nft, setNft] = useState<INftCardProps | null>(null);
  const router = useRouter();

  const { activeWallet, currency } = useStoreState(
    (state: IStoreModel) => state.wallet
  );

  const buyNFT = async () => {
    if (!nft) return;

    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchContract(signer);

    const price = ethers.utils.parseUnits(nft.price.toString(), 'ether');

    const transaction = await contract.createMarketSale(nft.tokenId, {
      value: price,
    });
    await transaction.wait();
  };

  const handleCheckout = async () => {
    try {
      setIsLoading(true);
      setIsModalVisible(false);
      await buyNFT();
      toast.success(`You successfully purchased ${nft?.metadata?.name} NFT`);
      setTimeout(() => router.push('/my-nft'), 2000);
    } catch (e) {
      console.log('Error purchasing the NFT', e);
      setIsError('Error purchasing the NFT');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (router.isReady) {
      const { owner, price, seller, tokenId, image, ...rest } = router.query;
      console.log({ image });
      if (owner && price && seller && tokenId) {
        setNft({
          image: image as string,
          owner: owner as string,
          seller: seller as string,
          tokenId: Number(tokenId),
          price: Number(price),
          metadata: rest,
        });
      }
      setIsLoading(false);
    }
  }, [router.isReady]);

  useEffect(() => {
    if (isError) {
      toast.error(isError);
    }
  }, [isError]);

  const content =
    isLoading && nft ? (
      <Spinner styles="min-h-screen flexCenter animate-fadeIn" />
    ) : nft ? (
      <div className="relative flex justify-center md:flex-col min-h-screen md:pt-24 animate-fadeIn">
        <div className="relative flex-1 flexCenter sm:px-4 p-12 border-r md:border-r-0 md:border-b dark:border-nft-black-1 border-nft-gray-1">
          <div className="relative w-557 minmd:w-2/3 minmd:h-2/3 sm:w-full sm:h-300 h-557">
            <Image
              src={nft.image}
              className="rounded-xl shadow-lg"
              alt="NFT"
              fill
              sizes="100%"
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
        </div>

        <div className="flex-1 flex justify-center flex-col sm:px-4 p-12 sm:pb-4 md:justify-start md:text-center">
          <div className="flex flex-row md:flex-col">
            <h2 className="font-poppins text-nft-red-violet  dark:text-nft-yellow font-semibold text-3xl">
              {nft.metadata.name || nft.tokenId}
            </h2>
          </div>
          <div className="mt-10">
            <p className="font-poppins dark:text-white text-nft-black-1 text-lg minlg:text-base font-normal">
              Creator:{' '}
              <span className="font-poppins dark:text-white text-nft-black-1 text-md minlg:text-base font-semibold">
                {` ${nft.seller?.slice(0, 3)}...${nft.seller?.slice(
                  nft.seller?.length - 5
                )}`}
              </span>
            </p>
          </div>

          <div className="mt-10 flex flex-col">
            <div className="w-full border-b dark:border-nft-black-1 border-nft-gray-1 flex flex-row md:justify-center">
              <p className="font-poppins dark:text-nft-yellow text-nft-black-1 text-lg minlg:text-base font-medium mb-2">
                Description
              </p>
            </div>

            <div className="mt-3">
              <p className="font-poppins dark:text-white text-nft-black-1 text-base font-normal">
                {nft.metadata.description}
              </p>
            </div>
          </div>

          <div className="flex flex-row md:flex-col mt-10">
            {!activeWallet ? (
              <Button
                label="Add Metamask wallet to checkout"
                disabled
                isPrimary={false}
                onClick={() => null}
              />
            ) : activeWallet === nft.seller.toLowerCase() ? (
              <Button
                label="You cannot buy your own NFT"
                disabled
                isPrimary={false}
                onClick={() => null}
              />
            ) : activeWallet === nft.owner.toLowerCase() ? (
              <Button
                isPrimary
                label="List on Marketplace"
                classStyles="mr-5 sm:mr-0 sm:mb-5 rounded-xl"
                onClick={() =>
                  router.push(
                    `/resell-nft?tokenId=${nft.tokenId}&image=${nft.image}&price=${nft.price}`
                  )
                }
              />
            ) : (
              <Button
                isPrimary
                label={`Buy for ${nft.price} ${currency}`}
                classStyles="mr-5 sm:mr-0 sm:mb-5 rounded-xl"
                onClick={() => setIsModalVisible(true)}
              />
            )}
          </div>
        </div>
      </div>
    ) : (
      <div>Oops... </div>
    );

  const modal = isModalVisible && nft && (
    <Modal
      header="Check Out"
      footer={
        <ButtonGroup
          options={[
            { label: 'Checkout', handleClick: handleCheckout },
            {
              label: 'Cancel',
              handleClick: () => setIsModalVisible(false),
            },
          ]}
        />
      }
      body={<PaymentBody nft={nft as INftCardProps} currency={currency} />}
      onClose={() => setIsModalVisible(false)}
    />
  );

  return (
    <div>
      {content}
      {modal}
    </div>
  );
};
export default NFTDetails;
