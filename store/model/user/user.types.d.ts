import { Action } from 'easy-peasy';

export interface IUser {
  name: string;
  avatar: string;
}

export interface IUserModel {
  token: string;
  name: string;
  avatar: string;
  setUser: Action<IUserModel, IUser>;
  clearUser: Action<IUserModel>;
  setToken: Action<IUserModel, string>;
}
