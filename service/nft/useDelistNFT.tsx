import { getErrMessage } from '../useMintNFT';
import { toast } from 'react-toastify';
import { getMarketplaceContract } from '../collection/utilts';
import useApproveMarketplace from '../marketplace/useApproveMarketplace';
import useIsMarketplaceApproved from '../marketplace/useIsMarketplaceApproved';

const useDelistNFT = async (
  tokenID: number,
  setListedNFT: (listedNFT: boolean) => void,
  setIsListedLoading: (isListedLoading: boolean) => void
) => {
  setIsListedLoading(true);
  const isApproved = await useIsMarketplaceApproved();
  console.log(isApproved);
  if (!isApproved) {
    await useApproveMarketplace();
    await useDelistNFT(tokenID, setListedNFT, setIsListedLoading);
  } else if (isApproved) {
    try {
      const contract = await getMarketplaceContract();

      const tx = await contract.delistNFT(tokenID);

      console.log('Transaction sent:', tx.hash);
      await tx.wait();
      console.log('Transaction mined');
      setListedNFT(false);
    } catch (err) {
      console.log({ err });
      const message = getErrMessage(err);
      toast.error(message);
    }
  }
  setIsListedLoading(false);
};

export default useDelistNFT;
