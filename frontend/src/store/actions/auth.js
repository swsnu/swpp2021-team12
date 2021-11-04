import { createAction } from 'redux-actions';
import * as actionTypes from './actionTypes';

export const signin = createAction(
  actionTypes.SIGNIN,
  ({ email, password }) => ({
    email,
    password,
  }),
);

export const signup = createAction(
  actionTypes.SIGNUP,
  ({ email, name, password }) => ({ email, name, password }),
);

export const signout = createAction(actionTypes.SIGNOUT);

export const checksignin = createAction(actionTypes.CHECKSIGNIN, ({ id }) => ({
  id,
}));
