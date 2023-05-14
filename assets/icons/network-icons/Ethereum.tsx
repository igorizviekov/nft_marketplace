import React from 'react';
import { INetworkIcons } from './NetworkIcons.types';

const Ethereum = ({ className }: INetworkIcons) => {
  return (
    <svg
      className={className}
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_2047_24071)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M20 40C8.95375 40 0 31.0462 0 20C0 8.95375 8.95375 0 20 0C31.0462 0 40 8.95375 40 20C40 31.0462 31.0462 40 20 40ZM20 6L12 19.2708L20 24L28 19.2708L20 6ZM19.9976 26.611L12 22L19.9976 33L28 22L19.9976 26.611Z"
          fill="#0A0909"
        />
      </g>
      <defs>
        <clipPath id="clip0_2047_24071">
          <rect width="40" height="40" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Ethereum;
