import React from 'react';
import styles from './ListingsBody.module.scss';
import { IListingsBody } from './ListingsBody.types';
const ListingsBody = ({ listings }: IListingsBody) => {
  return (
    <tbody>
      {listings.map((listing) => (
        <tr>
          <td>{listing.tokenId}</td>
          <td>{listing.price}</td>
          <td>{listing.collection}</td>
        </tr>
      ))}
    </tbody>
  );
};

export default ListingsBody;
