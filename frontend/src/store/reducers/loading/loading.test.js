/* eslint-disable no-undef */
import { createAction } from 'redux-actions';
import loading from './loading';
import * as actionTypes from '../../actions/actionTypes';

let action;

describe('loading reducer', () => {
  beforeEach(() => {
    action = { payload: true };
  });

  it('should START LOADING,', () => {
    const startLoading = createAction(actionTypes.START_LOADING);
    expect(loading(action, startLoading(action))).toEqual({
      '[object Object]': true,
      payload: true,
    });
  });

  it('should FINISH LOADING,', () => {
    const startLoading = createAction(actionTypes.FINISH_LOADING);
    expect(loading(action, startLoading(action))).toEqual({
      '[object Object]': false,
      payload: true,
    });
  });
});
