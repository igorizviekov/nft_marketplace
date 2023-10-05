import { getErrMessage } from '../useMintNFT';
import { toast } from 'react-toastify';
import { useStoreActions } from '../../store';
import { IShimmerNFT } from '../../components/ui/NFTCard/ShimmerNFTCard.types';
import { useEffect } from 'react';
import { getMarketplaceContract } from '../collection/utilts';
const useGetAllListings = async () => {
  const { setShimmerListedNFTS } = useStoreActions(
    (actions) => actions.listedNFTS
  );
  const pageSize = 20;

  useEffect(() => {
    const fetchListedTokens = async () => {
      const marketplaceContract = await getMarketplaceContract();

      const tokenIds = await marketplaceContract.getAllListings(pageSize);
      console.log(tokenIds);

      setShimmerListedNFTS(tokenIds as IShimmerNFT[]);
    };
    try {
      fetchListedTokens();
    } catch (err) {
      const message = getErrMessage(err);
      toast.error(message);
    }
  }, []);
};
export default useGetAllListings;
