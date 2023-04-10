import React from 'react';
import Icon from '../../../ui/Icon/Icon';
import { IDropdownMenuItem } from './DropdownMenuItem.types';
import styles from './DropdownMenuItem.module.scss';
import Link from 'next/link';

const DropdownMenuItem = ({ icon, label, href }: IDropdownMenuItem) => {
  return (
    <Link href={href ? href : ''} className={styles.dropdownItem}>
      <Icon icon={icon} />
      <p>{label}</p>
    </Link>
  );
};

export default DropdownMenuItem;
