import axios from 'axios';
const useFetchNFTLogs = (wallet: string) => {
  axios
    .get(
      `https://nft-api-production-4aa1.up.railway.app/nft-logs/users/${wallet}`
    )
    .then((response) => {
      return response;
    })
    .catch((error) => console.log(error));
};

export default useFetchNFTLogs;
