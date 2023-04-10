import React, { ReactComponentElement } from 'react';
import { IBasePageProps } from './BasePage.types';

const BasePage = ({ children }: IBasePageProps) => {
  return <div className="page">{children}</div>;
};

export default BasePage;
