import { action } from 'easy-peasy';
import { IUser, IUserModel } from './user.types';

export const UserModel: IUserModel = {
  token: '',
  name: '',
  avatar: '',
  setToken: action((state, payload: string) => {
    state.token = payload;
  }),
  setUser: action((state, payload: IUser) => {
    state.name = payload.name;
    state.avatar = payload.avatar;
  }),
  clearUser: action((state) => {
    state.name = '';
    state.avatar = '';
    state.token = '';
  }),
};
