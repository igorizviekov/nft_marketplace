import { action } from 'easy-peasy';
import { IUser, IUserModel } from './user.types';

export const UserModel: IUserModel = {
  user: undefined,
  setUser: action((state, payload) => {
    state.user = Object.create({
      name: payload.name,
      image: payload.image,
      description: payload.description,
      location: payload.location,
      discord: payload.discord,
      website: payload.website,
    });
  }),
  clearUser: action((state) => {
    state.user = undefined;
  }),
};
