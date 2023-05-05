import { Dispatch, SetStateAction } from 'react';

export type ActiveSelectOption =
  | 'Recently added'
  | 'Price (low to high)'
  | 'Price (high to low)';

export interface ISearchFilterProps {
  activeSelect: ActiveSelectOption;
  setActiveSelect: Dispatch<SetStateAction<ActiveSelectOption>>;
  onHandleSearch: (value: string) => void;
  onClearSearch: () => void;
}
