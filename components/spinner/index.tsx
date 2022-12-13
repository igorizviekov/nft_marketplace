import Lottie from 'lottie-react';
import React from 'react';
import spinner from '../../assets/icons/create-nft-icon.json';

export const Spinner = ({ styles }: { styles: string }) => {
  return (
    <div className={styles}>
      <Lottie animationData={spinner} loop={true} style={{ height: 300 }} />
    </div>
  );
};
