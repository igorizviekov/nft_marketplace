import axios from 'axios';

const useIsMarketplaceApproved = () => {
  const userID = localStorage.getItem('usersUID');
  const token = localStorage.getItem('token');

  const isApprovedMarketplace = axios
    .post(
      `https://nft-api-production-4aa1.up.railway.app/users/approve/${userID}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      console.log(response)
      return response.data.data.isApprovedMarketplace;
    })
    .catch((error) => console.error(error));

  return isApprovedMarketplace;
};

export default useIsMarketplaceApproved;
