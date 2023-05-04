import React from 'react';
import Icon from '../../../ui/Icon/Icon';
import { IDropdownMenuItem } from './DropdownMenuItem.types';
import styles from './DropdownMenuItem.module.scss';
import Link from 'next/link';

const DropdownMenuItem = ({
  icon,
  label,
  href,
  isNotLink,
  onClick,
}: IDropdownMenuItem) => {
  return (
    <>
      {!isNotLink ? (
        <Link href={href ? href : ''} className={styles.dropdownItem} onClick={onClick}>
          <Icon icon={icon} />
          <h3>{label}</h3>
        </Link>
      ) : (
        <div className={styles.dropdownItem} onClick={onClick}>
          <Icon icon={icon} />
          <h3>{label}</h3>
        </div>
      )}
    </>
  );
};

export default DropdownMenuItem;
