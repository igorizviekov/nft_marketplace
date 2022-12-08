import { action } from 'easy-peasy';
import { IUiModel, MenuTab } from './ui.types';

export const UIModel: IUiModel = {
  menuBarOpen: false,
  toggleMenu: action((state, payload: boolean) => {
    state.menuBarOpen = payload;
  }),
  toggleTab: action((state, payload: MenuTab) => {
    state.tab = payload;
  }),
  tab: 'Explore',
};
