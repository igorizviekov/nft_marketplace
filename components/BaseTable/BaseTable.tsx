import React from 'react';
import { IBaseTableProps } from './BaseTable.types';
import styles from './BaseTable.module.scss';
const BaseTable = ({ header, body }: IBaseTableProps) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {header.map((headerItem, index) => (
            <th key={index}>
              <h2>{headerItem}</h2>
            </th>
          ))}
        </tr>
      </thead>
      {body}
    </table>
  );
};

export default BaseTable;
