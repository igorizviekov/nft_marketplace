import { Dispatch, SetStateAction } from 'react';

export interface ISearchFilterProps {
  onHandleSearch: (value: string) => void;
  onClearSearch: () => void;
}
