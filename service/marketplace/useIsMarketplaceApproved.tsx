import axios from 'axios';

const useIsMarketplaceApproved = () => {
  const userID = localStorage.getItem('usersUID');
  const token = localStorage.getItem('token');

  const isApprovedMarketplace = axios
    .post(
      `${process.env.NEXT_PUBLIC_API_KEY}/users/approve/${userID}`,
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
