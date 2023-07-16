import React, { ReactComponentElement } from 'react';
import { IBasePageProps } from './BasePage.types';
import styles from './BasePage.module.scss';
const BasePage = ({ children }: IBasePageProps) => {
  return <div className={styles.page}>{children}</div>;
};

export default BasePage;
