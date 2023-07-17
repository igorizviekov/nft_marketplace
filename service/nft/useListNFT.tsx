import { ethers } from 'ethers';
import { getErrMessage } from '../useMintNFT';
import { toast } from 'react-toastify';
import { getMarketplaceContract } from '../collection/utilts';
import useIsMarketplaceApproved from '../marketplace/useIsMarketplaceApproved';
import useApproveMarketplace from '../marketplace/useApproveMarketplace';
const useListNFT = async (
  tokenID: number,
  newPrice: number,
  setListedNFT: (isListed: boolean) => void
) => {
  const userID = localStorage.getItem('usersUID');
  const isApproved = userID && await useIsMarketplaceApproved(userID);

  if (!isApproved) {
    await useApproveMarketplace();
    await useListNFT(tokenID, newPrice, setListedNFT);
  } else if (isApproved) {
    try {
      const marketplaceContract = await getMarketplaceContract();
      const price = ethers.utils.parseUnits(newPrice.toString(), 'ether');

      const tx = await marketplaceContract.listNFT(tokenID, price);
      console.log(tokenID);

      console.log('Transaction sent:', tx.hash);
      await tx.wait();
      console.log('Transaction mined', tx);
      setListedNFT(true);
    } catch (err) {
      console.log({ err });
      const message = getErrMessage(err);
      toast.error(message);
    }
  }
};

export default useListNFT;
