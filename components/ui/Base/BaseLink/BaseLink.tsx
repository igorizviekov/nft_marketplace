import React from 'react';
import styles from './BaseLink.module.scss';
import { IBaseLinkProps } from './BaseLink.types';
import Link from 'next/link';
import classNames from 'classnames';
const BaseLink = ({ href, children, active, isExternal }: IBaseLinkProps) => {
  console.log(href);
  return (
    <Link
      href={isExternal ? `https://${href}` : href}
      target="_blank"
      className={classNames(styles.link, active === children && styles.active)}
    >
      <h3>{children}</h3>
    </Link>
  );
};

export default BaseLink;
