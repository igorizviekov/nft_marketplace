import { StaticImageData } from 'next/image';
import { INFT } from '../../../store/model/profile/profile.types';

export interface INftCardProps {
  nft: INFT | undefined;
}
export interface ITraits {
  display_type: string;
  trait_type: string;
  value: string;
}