import { HTMLAttributes } from 'react';
import { IconContext } from 'react-icons';
export interface IIconProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Icon element as in react-icons
   */
  icon: JSX.Element;
  /**
   * Icon Context Provider
   */
  context?: IconContext;
}
