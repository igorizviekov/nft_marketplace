export interface IFilterProps {
  options: INFTCategories[];
  selected: number;
  onSelect: Dispatch<SetStateAction<number>>;
}

export type INFTCategories = 'Cat 1' | 'Cat 2' | 'Cat 3';
