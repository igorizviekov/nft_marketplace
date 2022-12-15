import { useStoreState } from 'easy-peasy';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Spinner } from '../../components/spinner';
import { INftCardProps } from '../../components/ui/nft-card';
import { IStoreModel } from '../../store/model/model.types';
import Image from 'next/image';
import { Button } from '../../components/ui/Button';

const NFTDetails = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState<boolean | string>(true);
  const [nft, setNft] = useState<INftCardProps | null>(null);

  const router = useRouter();

  const { activeWallet, currency } = useStoreState(
    (state: IStoreModel) => state.wallet
  );

  useEffect(() => {
    if (router.isReady) {
      const { img, name, owner, price, seller, tokenId, description } =
        router.query;
      if (img && name && owner && price && seller && tokenId && description) {
        setNft({
          img: img as string,
          name: name as string,
          owner: owner as string,
          seller: seller as string,
          description: description as string,
          tokenId: Number(tokenId),
          price: Number(price),
        });
      }
      setIsLoading(false);
    }
  }, [router.isReady]);

  const content =
    isLoading && nft ? (
      <Spinner styles="min-h-screen flexCenter animate-fadeIn" />
    ) : nft ? (
      <div className="relative flex justify-center md:flex-col min-h-screen md:pt-24">
        <div className="relative flex-1 flexCenter sm:px-4 p-12 border-r md:border-r-0 md:border-b dark:border-nft-black-1 border-nft-gray-1">
          <div className="relative w-557 minmd:w-2/3 minmd:h-2/3 sm:w-full sm:h-300 h-557">
            <Image
              src={nft.img}
              className="rounded-xl shadow-lg"
              alt="NFT"
              fill
              sizes="100%"
              priority
            />
          </div>
        </div>

        <div className="flex-1 flex justify-center flex-col sm:px-4 p-12 sm:pb-4 md:justify-start md:text-center">
          <div className="flex flex-row md:flex-col">
            <h2 className="font-poppins text-nft-red-violet font-semibold text-3xl">
              {nft.name}
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
              <p className="font-poppins dark:text-white text-nft-black-1 text-lg minlg:text-base font-medium mb-2">
                Description
              </p>
            </div>

            <div className="mt-3">
              <p className="font-poppins dark:text-white text-nft-black-1 text-base font-normal">
                {nft.description}
              </p>
            </div>
          </div>

          <div className="flex flex-row md:flex-col mt-10">
            {activeWallet === nft.seller.toLowerCase() ? (
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
                    `/resell-nft?tokenId=${nft.tokenId}&tokenURI=${nft.img}`
                  )
                }
              />
            ) : (
              <Button
                isPrimary
                label={`Buy for ${nft.price} ${currency}`}
                classStyles="mr-5 sm:mr-0 sm:mb-5 rounded-xl"
                onClick={() => null}
              />
            )}
          </div>
        </div>
      </div>
    ) : (
      <div>Error</div>
    );
  return <div>{content}</div>;
};
export default NFTDetails;
