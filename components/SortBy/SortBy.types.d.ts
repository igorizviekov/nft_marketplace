export interface ISortByProps {
  activeSelect: ActiveSelectOption;
  setActiveSelect: Dispatch<SetStateAction<ActiveSelectOption>>;
}

export type ActiveSelectOption =
  | 'Recently added'
  | 'Price (low to high)'
  | 'Price (high to low)';
