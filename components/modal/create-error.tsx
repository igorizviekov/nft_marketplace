import ErrorDog from '../../assets/icons/error-dog.json';
import Lottie from 'lottie-react';

export const CreateError = () => (
  <>
    <Lottie animationData={ErrorDog} loop={true} style={{ height: 200 }} />
    <p className="font-poppins dark:text-white text-nft-black-1 mt-2 ml-4 font-semibold sm:ml-2">
      Transaction failed due to insufficient balance in your wallet or wrong
      network connection.
    </p>
    <p className="font-poppins dark:text-white text-nft-black-1 mt-2 ml-4 font-semibold sm:ml-2">
      Please ensure your wallet is connected to the Polygon network and has
      positive balance.
    </p>
  </>
);
