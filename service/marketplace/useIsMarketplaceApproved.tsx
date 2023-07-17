import axios from 'axios';

const useIsMarketplaceApproved = (id: string) => {
  const isApprovedMarketplace = axios
    .post(`https://nft-api-production-4aa1.up.railway.app/users/approve/${id}`)
    .then((response) => {
      return response.data.isApprovedMarketplace;
    })
    .catch((error) => console.error(error));

  return isApprovedMarketplace;
};

export default useIsMarketplaceApproved;
