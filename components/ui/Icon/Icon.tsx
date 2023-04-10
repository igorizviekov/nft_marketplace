import React from 'react';
import { IconContext } from 'react-icons';
import { IIconProps } from './Icon.types';
import styles from './Icon.module.scss';
const Icon = ({ icon, context, ...props }: IIconProps) => {
  const providerProps = context
    ? { value: context }
    : { value: { style: { width: '1rem' } } };
  return (
    <IconContext.Provider {...providerProps}>
      <div className={styles.icon} {...props}>
        {icon}
      </div>
    </IconContext.Provider>
  );
};

export default Icon;
