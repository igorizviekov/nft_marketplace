import { ITraits } from '../components/ui/NFTCard/NFTCard.types';

export function refactorAttributeDate(attribute: ITraits): string {
  if (attribute.display_type === 'date') {
    const date = new Date(attribute.value);

    return `${date.getMonth()}-${date.getDate()}-${date.getFullYear()}`;
  }

  return attribute.value;
}
