import axios from 'axios';
const useFetchNFTLogs = (wallet: string) => {
  axios
    .get(
      `${process.env.NEXT_PUBLIC_API_KEY}/nft-logs/users/${wallet}`
    )
    .then((response) => {
      return response;
    })
    .catch((error) => console.log(error));
};

export default useFetchNFTLogs;
