import React from 'react';
import Icon from '../../../ui/Icon/Icon';
import { IDropdownMenuItem } from './DropdownMenuItem.types';
import styles from './DropdownMenuItem.module.scss'

const DropdownMenuItem = ({ icon, label }: IDropdownMenuItem) => {
  return (
    <div className={styles.dropdownItem}>
      <Icon icon={icon} />
      <p>{label}</p>
    </div>
  );
};

export default DropdownMenuItem;
