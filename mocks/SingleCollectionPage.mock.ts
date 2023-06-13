import { TEST_IMAGE_URL } from '../components/ui/Base/BaseImage/BaseImage';
import { INftCardProps } from '../components/ui/NFTCard/NFTCard.types';
import { INFT } from '../store/model/profile/profile.types';

export interface ICollectionTraits {
  traits: ICollectionTrait[];
}
export interface ICollectionTrait {
  trait_type: string;
  values: string[];
}
export const CollectionTraits: ICollectionTraits = {
  traits: [
    {
      trait_type: 'background',
      values: ['wine red', 'value 23', 'value 13', 'value 44'],
    },
    {
      trait_type: 'body',
      values: ['blue', 'value 32', 'value 563', 'value 45'],
    },
    {
      trait_type: 'button',
      values: ['none', 'value 275', 'value 35', 'value 46'],
    },
    {
      trait_type: 'antenna',
      values: ['dork funnel', 'value 27', 'value 36', 'value 45'],
    },
    {
      trait_type: 'eyes',
      values: ['broken', 'value 25', 'value 36', 'value 47'],
    },
    {
      trait_type: 'mouth',
      values: ['zip', 'value 254', 'value 364', 'value 4'],
    },
    { trait_type: 'face', values: ['none', 'value 23', 'value 33', 'value 4'] },
    {
      trait_type: 'headgear',
      values: ['farmers hat', 'value 2', 'value 3', 'value 4'],
    },
    {
      trait_type: 'outfit',
      values: ['dirty tank top', 'value 2', 'value 3', 'value 4'],
    },
    {
      trait_type: 'special',
      values: ['none', 'value 2', 'value 3', 'value 4'],
    },
    {
      trait_type: 'accessory',
      values: ['hobo stick', 'value 2', 'value 3', 'value 4'],
    },
    { trait_type: 'nftl', values: ['none', 'value 2', 'value 3', 'value 4'] },
    {
      trait_type: 'bonus',
      values: ['none', 'value 2', 'value 3', 'value 4'],
    },
    {
      trait_type: 'wallet',
      values: ['680', 'value 2', 'value 3', 'value 4'],
    },
  ],
};
