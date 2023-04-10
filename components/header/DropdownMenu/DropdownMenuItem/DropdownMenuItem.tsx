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
        <Link href={href ? href : ''} className={styles.dropdownItem}>
          <Icon icon={icon} />
          <p>{label}</p>
        </Link>
      ) : (
        <div className={styles.dropdownItem} onClick={onClick}>
          <Icon icon={icon} />
          <p>{label}</p>
        </div>
      )}
    </>
  );
};

export default DropdownMenuItem;
