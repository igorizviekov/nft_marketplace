import { StaticImageData } from 'next/image';

export interface IBaseImageProps {
  imageUrl?: string | StaticImageData;
  description?: string;
}
