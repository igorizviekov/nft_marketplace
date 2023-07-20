import { getErrMessage } from '../useMintNFT';
import { toast } from 'react-toastify';
import { ethers } from 'ethers';
import useApproveMarketplace from '../marketplace/useApproveMarketplace';
const isListed = async (
  tokenID: number,
  marketplaceContract: ethers.Contract
) => {
  try {
    const tx = await marketplaceContract.isTokenListed(tokenID);
    return tx;
  } catch (err) {
    console.log({ err });
    const message = getErrMessage(err);
    toast.error(message);
  }
};

export default isListed;
