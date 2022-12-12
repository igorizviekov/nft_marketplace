import Lottie from 'lottie-react';
import React from 'react';
import spinner from '../../assets/icons/create-nft-icon.json';

export const Spinner = () => {
  return (
    <div className="min-h-screen flexCenter animate-fadeIn">
      <Lottie animationData={spinner} loop={true} style={{ height: 300 }} />
    </div>
  );
};
