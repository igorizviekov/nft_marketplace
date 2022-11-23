import { Action } from 'easy-peasy';
export type ThemeMode = 'dark' | 'light';

export type MenuTab = 'Explore' | 'Feed' | 'Account';

export interface IUiModel {
  menuBarOpen: boolean;
  toggleMenu: Action<IUiModel, boolean>;
  currency: string;
  tab: MenuTab;
  toggleTab: Action<IUiModel, MenuTab>;
}
