/* eslint-disable no-undef */
import { createAction } from 'redux-actions';
import auth, { authSaga } from './auth';
import * as actionTypes from '../../actions/actionTypes';

let initialState;

describe('auth reducer', () => {
  beforeEach(() => {
    initialState = {
      auth: null,
      authError: null,
    };
  });
  it('should update auth when SIGNIN SUCCEED,', () => {
    const succeedSignIn = createAction(
      actionTypes.SIGNIN_SUCCESS,
      (newAuth) => newAuth,
    );
    expect(auth(initialState, succeedSignIn({ id: 1 }))).toEqual({
      auth: { id: 1 },
      authError: null,
    });
  });

  it('should update auth when SIGNUP SUCCEED,', () => {
    const succeedSignUp = createAction(
      actionTypes.SIGNUP_SUCCESS,
      (newAuth) => newAuth,
    );
    expect(auth(initialState, succeedSignUp({ id: 1 }))).toEqual({
      auth: { id: 1 },
      authError: null,
    });
  });

  it('should update auth when SIGNOUT SUCCEED,', () => {
    const succeedSignOut = createAction(actionTypes.SIGNOUT_SUCCESS);
    expect(auth(initialState, succeedSignOut())).toEqual({
      auth: null,
      authError: null,
    });
  });

  it('should update auth when CHECKSIGNIN SUCCEED,', () => {
    const succeedCheckSignin = createAction(
      actionTypes.CHECKSIGNIN_SUCCESS,
      (id) => id,
    );
    expect(auth(initialState, succeedCheckSignin({ id: 1 }))).toEqual({
      auth: { id: 1 },
      authError: null,
    });
  });

  it('should raise error when SIGNIN FAILED,', () => {
    const failSignIn = createAction(
      actionTypes.SIGNIN_FAILURE,
      (error) => error,
    );
    expect(auth(initialState, failSignIn('error'))).toEqual({
      auth: null,
      authError: 'error',
    });
  });

  it('should raise error when SIGNUP FAILED,', () => {
    const failSignUp = createAction(
      actionTypes.SIGNUP_FAILURE,
      (error) => error,
    );
    expect(auth(initialState, failSignUp('error'))).toEqual({
      auth: null,
      authError: 'error',
    });
  });

  it('should raise error when SIGNOUT FAILED,', () => {
    const failSignOut = createAction(
      actionTypes.SIGNOUT_FAILURE,
      (error) => error,
    );
    expect(auth(initialState, failSignOut('error'))).toEqual({
      auth: null,
      authError: 'error',
    });
  });

  it('should raise error when CHECKSIGNIN FAILED,', () => {
    const failCheckSignin = createAction(
      actionTypes.CHECKSIGNIN_FAILURE,
      (error) => error,
    );
    expect(auth(initialState, failCheckSignin('error'))).toEqual({
      auth: null,
      authError: 'error',
    });
  });

  it('should have authSaga', () => {
    const gen = authSaga();
    gen.next();
    gen.next();
    gen.next();
    gen.next();
    expect(gen.next().done).toBe(true);
  });
});
