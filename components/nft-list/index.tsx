import { INftCardProps, NftCard } from '../ui/nft-card';
import { SearchFilter } from '../search-filter';
import { Spinner } from '../spinner';
import { ISearchFilterProps } from '../search-filter/search-filter.types';

interface INFTListProps {
  nfts: INftCardProps[];
  isLoading: boolean;
  searchProps: ISearchFilterProps;
}

export const NftList = ({ isLoading, nfts, searchProps }: INFTListProps) => {
  const { onClearSearch, onHandleSearch, setActiveSelect, activeSelect } =
    searchProps;

  const populateOwnerNickname = (nfts: INftCardProps[]) =>
    nfts.reduce((nfts: INftCardProps[], currentNFT) => {
      const ownerNickname = nfts.find(
        (a) => a.owner === currentNFT.owner && a.nickname
      )?.nickname;
      if (ownerNickname) {
        currentNFT.nickname = ownerNickname;
      }
      nfts.push(currentNFT);
      return nfts;
    }, []);

  return (
    <div className="mb-12">
      <div className="w-full flex flex-wrap justify-start md:justify-center ">
        {isLoading ? (
          <Spinner styles="min-h-screen w-full mt-20 animate-fadeIn" />
        ) : !isLoading && !nfts.length ? (
          <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold my-5 px-5 sm:text-center min-h-screen">
            No NFTs Listed for Sale
          </h1>
        ) : (
          <>
            <div className="w-full flex justify-between flex-center  animate-fadeIn sm:flex-col">
              <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold my-5 px-5 sm:text-center">
                Trending NFTs
              </h1>
              <SearchFilter
                activeSelect={activeSelect}
                setActiveSelect={setActiveSelect}
                onClearSearch={onClearSearch}
                onHandleSearch={onHandleSearch}
              />
            </div>
            {populateOwnerNickname(nfts).map((nft, i) => (
              <NftCard key={nft.owner + i} {...nft} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};
