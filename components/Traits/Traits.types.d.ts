import { Trait } from '../../store/model/nft-mint/nft-mint.types';
export interface ITraitProps {
  traits: Traits[];
  addTrait: (trait: Trait) => void;
  setFormError: (hasError: boolean) => void;
  traitError: boolean;
}

export interface ITraitForm {
  traitType: string;
  value: string;
}
export interface ITraitListProps {
  traits: Trait[];
  deleteTrait: (trait: Trait) => void;
}
