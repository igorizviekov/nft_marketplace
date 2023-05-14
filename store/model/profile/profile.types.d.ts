import { Action } from 'easy-peasy';

export interface IProfileModel {
  profile: IProfile;

  updateProfile: Action<IProfileModel, IProfile>;
}

export interface IProfile {
  name?: string;
  email?: string;
  location?: string;
  website?: string;
  discord?: string;
  // description?: string;
  // image?: string;
  // twitter?: string;
  // instagram?: string;
}
