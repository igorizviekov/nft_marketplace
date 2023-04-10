import React from 'react';
import { IconContext } from 'react-icons';
import { IIconProps } from './Icon.types';
import classNames from 'classnames';
const Icon = ({ icon, context, className, ...props }: IIconProps) => {
  const providerProps = context
    ? { value: context }
    : { value: { style: { width: '1rem' } } };

  return (
    <IconContext.Provider {...providerProps}>
      <div className={classNames(className)} {...props}>
        {icon}
      </div>
    </IconContext.Provider>
  );
};

export default Icon;
