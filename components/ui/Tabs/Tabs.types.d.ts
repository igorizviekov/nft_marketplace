import { HTMLAttributes } from 'react';

export interface ITabsProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Tab options list
   */
  options: string[];

  /**
   * Selected tab
   */
  selected: number;

  /**
   * Tab change handler
   */
  handleChange: (index: number) => void;
}
