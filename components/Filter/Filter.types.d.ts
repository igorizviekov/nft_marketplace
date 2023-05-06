export interface IFilterProps {
  options: INFTCategories[];
  selected: number;
  onSelect: Dispatch<SetStateAction<number>>;
}

export type INFTCategories =
  | 'Collectibles'
  | 'PFPS'
  | 'Art'
  | 'Games'
  | 'Virtual Worlds'
  | 'Sports'
  | 'Music';
