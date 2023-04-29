import React from 'react';
import styles from './BaseLink.module.scss';
import { IBaseLinkProps } from './BaseLink.types';
import Link from 'next/link';
import classNames from 'classnames';
const BaseLink = ({ href, children, active }: IBaseLinkProps) => {
  return (
    <Link
      href={href}
      className={classNames(styles.link, active === children && styles.active)}
    >
      {children}
    </Link>
  );
};

export default BaseLink;
