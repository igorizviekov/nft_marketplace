import { action } from 'easy-peasy';
import { IUser, IUserModel } from './user.types';

export const UserModel: IUserModel = {
  name: '',
  avatar: '',
  setUser: action((state, payload: IUser) => {
    state.name = payload.name;
    state.avatar = payload.avatar;
  }),
  clearUser: action((state) => {
    state.name = '';
    state.avatar = '';
  }),
};
