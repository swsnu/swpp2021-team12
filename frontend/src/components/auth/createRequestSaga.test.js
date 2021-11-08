/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-undef */
import { runSaga } from 'redux-saga';
import * as axios from 'axios';
import createRequestSaga from './createRequestSaga';
import * as actionTypes from '../../store/actions/actionTypes';
import * as authAPI from '../../lib/api/auth';

jest.mock('axios');
describe('Saga of auth', () => {
  it('should work on SIGNIN', async () => {
    const dummyAuth = { password: 'tt', email: 'tt' };
    axios.post.mockImplementation(() => Promise.resolve({ data: dummyAuth }));
    const dispatched = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      createRequestSaga(actionTypes.SIGNIN, authAPI.signin),
      { payload: { email: 'tt', password: 'tt' } },
    );
    expect(dispatched).toEqual([
      { payload: 'auth/SIGNIN', type: 'loading/START_LOADING' },
    ]);
  });

  it('should work on SIGNUP', async () => {
    const dummyAuth = { email: 'tt', password: 'tt', name: 'tt' };
    axios.post.mockImplementation(() => Promise.resolve({ data: dummyAuth }));
    const dispatched = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      createRequestSaga(actionTypes.SIGNUP, authAPI.signup),
      { payload: dummyAuth },
    );
    expect(dispatched).toEqual([
      { payload: 'auth/SIGNUP', type: 'loading/START_LOADING' },
    ]);
  });

  it('should work on SIGNOUT', async () => {
    axios.get.mockImplementation(() => Promise.resolve({ data: '' }));
    const dispatched = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      createRequestSaga(actionTypes.SIGNOUT, authAPI.signout),
    );
    expect(dispatched).toEqual([
      { payload: 'auth/SIGNOUT', type: 'loading/START_LOADING' },
    ]);
  });

  it('should work on CHECKSIGNIN', async () => {
    axios.get.mockImplementation(() => Promise.resolve({ data: '' }));
    const dispatched = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      createRequestSaga(actionTypes.CHECKSIGNIN, authAPI.checksignin),
    );
    expect(dispatched).toEqual([
      { payload: 'auth/CHECKSIGNIN', type: 'loading/START_LOADING' },
    ]);
  });

  it('should fail on SIGNIN', async () => {
    const dummyAuth = { password: 'tt', email: 'tt' };
    axios.post.mockImplementation(() => Promise.reject({ status: 500 }));
    const dispatched = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      createRequestSaga(actionTypes.SIGNIN, authAPI.signin),
      { payload: dummyAuth },
    );
    expect(dispatched).toEqual([
      { payload: 'auth/SIGNIN', type: 'loading/START_LOADING' },
    ]);
  });

  it('should fail on SIGNUP', async () => {
    const dummyAuth = { password: 'tt', email: 'tt' };
    axios.post.mockImplementation(() => Promise.reject({ status: 500 }));
    const dispatched = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      createRequestSaga(actionTypes.SIGNUP, authAPI.signup),
      { payload: dummyAuth },
    );
    expect(dispatched).toEqual([
      { payload: 'auth/SIGNUP', type: 'loading/START_LOADING' },
    ]);
  });

  it('should fail on SIGNOUT', async () => {
    axios.get.mockImplementation(() => Promise.reject({ status: 500 }));
    const dispatched = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      createRequestSaga(actionTypes.SIGNOUT, authAPI.signout),
    );
    expect(dispatched).toEqual([
      { payload: 'auth/SIGNOUT', type: 'loading/START_LOADING' },
    ]);
  });

  it('should fail on CHECKSIGNIN', async () => {
    axios.get.mockImplementation(() => Promise.reject({ status: 500 }));
    const dispatched = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      createRequestSaga(actionTypes.CHECKSIGNIN, authAPI.checksignin),
    );
    expect(dispatched).toEqual([
      { payload: 'auth/CHECKSIGNIN', type: 'loading/START_LOADING' },
    ]);
  });

  it('should have default case', async () => {
    const dispatched = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      createRequestSaga('none', '/api/articles'),
    );
    expect(dispatched).toEqual([
      {
        payload: 'none',
        type: 'loading/START_LOADING',
      },
      {
        payload: 'none',
        type: 'loading/FINISH_LOADING',
      },
    ]);
  });
});
