import axios from 'axios';
const useFetchNFTLogs = (wallet: string) => {
  axios
    .get(
      `https://nft-api-production-3c8d.up.railway.app/nft-logs/users/${wallet}`
    )
    .then((response) => {
      return response;
    })
    .catch((error) => console.log(error));
};

export default useFetchNFTLogs;
