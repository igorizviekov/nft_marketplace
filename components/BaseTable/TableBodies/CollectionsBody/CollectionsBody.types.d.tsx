import { ICollection } from '../../../../store/model/app/app.types';

export interface ICollectionsBodyProps {
  collections: ICollection[];
  isProfileCollections?: boolean;
}
