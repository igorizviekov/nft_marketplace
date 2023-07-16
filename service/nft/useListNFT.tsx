import { ethers } from 'ethers';
import { getErrMessage } from '../useMintNFT';
import { toast } from 'react-toastify';
import { getMarketplaceContract } from '../collection/utilts';
const useListNFT = async (
  tokenID: number,
  newPrice: number,
  setListedNFT: (isListed: boolean) => void
) => {
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
};

export default useListNFT;
