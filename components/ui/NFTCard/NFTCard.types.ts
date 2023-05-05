import { StaticImageData } from "next/image";

export interface INftCardProps {
  name: string;
  seller: string;
  owner: string;
  description: string;
  img: StaticImageData | string;
  price: number;
  tokenId: number;
  traits: ITraits[];
  nickname?: string;
  avatar?: string;
  status?: NFTStatus;
}
export interface ITraits {
  trait_type: string;
  value: string;
}
type NFTStatus =
  | 'On Sale'
  | 'Created'
  | 'My NTFs'
  | 'Liked'
  | 'Activity'
  | 'Outgoing Offers'
  | 'Incoming Offers';
