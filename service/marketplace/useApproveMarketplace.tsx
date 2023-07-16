import { marketplaceAddress } from '../../mocks/constants.mock';
import { getCollectionContract } from '../collection/utilts';

const useApproveMarketplace = async () => {
  const nftContract = await getCollectionContract();
  const tx = await nftContract.setApprovalForAll(marketplaceAddress, true);
  console.log('Transaction sent: ', tx.hash);
  await tx.wait();
  console.log('Transaction mined');
};

export default useApproveMarketplace;
