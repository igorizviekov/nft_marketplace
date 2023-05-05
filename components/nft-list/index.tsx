import { INftCardProps } from '../ui/NFTCard/NFTCard.types';
import { Searchbar } from '../Searchbar/Searchbar';
import { Spinner } from '../spinner';
import { ISearchFilterProps } from '../Searchbar/Searchbar.types';

interface INFTListProps {
  nfts: INftCardProps[];
  isLoading: boolean;
  searchProps: ISearchFilterProps;
}

export const NftList = ({ isLoading, nfts, searchProps }: INFTListProps) => {
  const { onClearSearch, onHandleSearch } = searchProps;

  return (
    <div className="mb-12">
      <div className="w-full flex flex-wrap justify-start md:justify-center ">
        {isLoading ? (
          <Spinner />
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
              <Searchbar
                onClearSearch={onClearSearch}
                onHandleSearch={onHandleSearch}
              />
              {/* //@TODO Add Nfts */}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
