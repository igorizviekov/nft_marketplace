import { Action } from 'easy-peasy';

export interface IUserModel {
  user: IUser | undefined;
  setUser: Action<IUserModel, IUser>;
  clearUser: Action<IUserModel>;
}

export interface IUser {
  image: string;
  name: string;
  description: string;
  location: string;
  discord: string;
  website: string;
}
