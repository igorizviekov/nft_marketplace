import React, { ReactComponentElement } from 'react';
import { IBasePageProps } from './BasePage.types';
import styles from './BasePage.module.scss';
import { useStoreRehydrated } from 'easy-peasy';
const BasePage = ({ children }: IBasePageProps) => {
  const isRehydrated = useStoreRehydrated();
  return <>{isRehydrated && <div className={styles.page}>{children}</div>}</>;
};

export default BasePage;
