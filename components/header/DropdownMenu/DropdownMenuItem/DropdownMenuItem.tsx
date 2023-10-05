import React from 'react';
import Icon from '../../../ui/Icon/Icon';
import { IDropdownMenuItem } from './DropdownMenuItem.types';
import styles from './DropdownMenuItem.module.scss';
import Link from 'next/link';
import classNames from 'classnames';

const DropdownMenuItem = ({
  icon,
  label,
  href,
  isNotLink,
  onClick,
  className,
}: IDropdownMenuItem) => {
  return (
    <>
      {!isNotLink ? (
        <Link
          href={href ? href : ''}
          className={classNames(styles.dropdownItem, className)}
          onClick={onClick}
        >
          <Icon icon={icon} />
          <h5>{label}</h5>
        </Link>
      ) : (
        <div className={styles.dropdownItem} onClick={onClick}>
          <Icon icon={icon} />
          <h5>{label}</h5>
        </div>
      )}
    </>
  );
};

export default DropdownMenuItem;
