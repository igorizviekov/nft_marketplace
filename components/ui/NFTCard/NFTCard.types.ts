import { StaticImageData } from 'next/image';

export interface INftCardProps {
  name: string;
  seller: string;
  owner: string;
  description: string;
  img: StaticImageData | string;
  price: number;
  tokenId: string;
  traits: ITraits[];
  address?: string;
  collectionName?: string;
  nickname?: string;
  avatar?: string;
  status?: NFTStatus;
}
export interface ITraits {
  trait_type: string;
  value: string;
}
type NFTStatus = 'On Sale' | 'Bid' | 'Make Offer';
