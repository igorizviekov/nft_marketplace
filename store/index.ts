import { createStore, createTypedHooks } from 'easy-peasy';
import { model } from './model';
import { IStoreModel } from './model/model.types';

export const store = createStore(model);
export const { useStoreActions, useStoreState, useStoreDispatch, useStore } =
  createTypedHooks<IStoreModel>();
