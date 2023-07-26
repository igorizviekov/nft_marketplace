import { getErrMessage } from '../useMintNFT';
import { toast } from 'react-toastify';
import { getMarketplaceContract } from '../collection/utilts';
const isListed = async (tokenID: number) => {
  try {
    const marketplaceContract = await getMarketplaceContract();
    const tx = await marketplaceContract.isTokenListed(tokenID);
    return tx;
  } catch (err) {
    console.log({ err });
    const message = getErrMessage(err);
    toast.error(message);
  }
};

export default isListed;
