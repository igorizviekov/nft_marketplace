import React from 'react';
import { INetworkIcons } from './NetworkIcons.types';

const Shimmer = ({ className }: INetworkIcons) => {
  return (
    <svg
      className={className}
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_2152_13619)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M20 0C8.95431 0 0 8.95431 0 20C0 31.0457 8.95431 40 20 40C31.0457 40 40 31.0457 40 20C40 8.95431 31.0457 0 20 0ZM13.0568 11.0531C17.1974 6.91745 23.9993 6.99636 28.3002 11.2105L25.9428 13.5651C22.8774 10.5842 18.1864 10.6385 15.4141 13.4075C12.6417 16.1766 12.5873 20.8619 15.5718 23.9236L13.2144 26.2781C8.99515 21.9824 8.91614 15.1887 13.0568 11.0531ZM25.9432 28.9469C21.8026 33.0825 15.0007 33.0036 10.6998 28.7895L13.0572 26.4349C16.1226 29.4158 20.8136 29.3615 23.5859 26.5925C26.3583 23.8234 26.4127 19.1381 23.4282 16.0764L25.7856 13.7219C30.0049 18.0176 30.0839 24.8113 25.9432 28.9469Z"
          fill="#0A0909"
        />
      </g>
      <defs>
        <clipPath id="clip0_2152_13619">
          <rect width="40" height="40" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Shimmer;
