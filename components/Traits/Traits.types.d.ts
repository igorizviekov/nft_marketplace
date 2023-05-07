import { Trait } from '../../store/model/nft-mint/nft-mint.types';
export interface ITraitProps {
  addTrait: (trait: Trait) => void;
}

export interface ITraitForm {
  traitType: string;
  value: string;
}
export interface ITraitListProps {
  traits: Trait[];
  deleteTrait: (trait: Trait) => void;
}
