import { Action } from 'easy-peasy';
export type ThemeMode = 'dark' | 'light';

export type MenuTab = 'Explore' | 'Listed NFTs' | 'Account';

export interface IUiModel {
  menuBarOpen: boolean;
  toggleMenu: Action<IUiModel, boolean>;
  tab: MenuTab;
  toggleTab: Action<IUiModel, MenuTab>;
}
