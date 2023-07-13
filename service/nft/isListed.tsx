import { getErrMessage } from '../useMintNFT';
import { toast } from 'react-toastify';
import { marketplaceContract } from '../../scripts/utils';

const isListed = async (tokenID: number) => {
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
