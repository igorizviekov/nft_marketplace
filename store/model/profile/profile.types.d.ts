import { Action } from 'easy-peasy';

export interface IProfileModel {
  profile: IProfile;

  updateProfile: Action<IProfileModel, IProfile>;
}

export interface IProfile {
  avatar?: string;
  username?: string;
  description?: string;
  email?: string;
  location?: string;
  website?: string;
  discord?: string;
  twitter?: string;
  instagram?: string;
}
