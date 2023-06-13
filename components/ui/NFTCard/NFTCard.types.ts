import { StaticImageData } from 'next/image';
import { INFT } from '../../../store/model/profile/profile.types';
import { Nft } from 'alchemy-sdk';

export interface INftCardProps {
  nft: Nft | undefined;
}
export interface ITraits {
  display_type: string;
  trait_type: string;
  value: string;
}