import { handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import * as actionTypes from '../../actions/actionTypes';
import createRequestSaga from '../../../components/auth/createRequestSaga';
import * as authAPI from '../../../lib/api/auth';

const signinSaga = createRequestSaga(actionTypes.SIGNIN, authAPI.signin);
const signupSaga = createRequestSaga(actionTypes.SIGNUP, authAPI.signup);
const signoutSaga = createRequestSaga(actionTypes.SIGNOUT, authAPI.signout);
export function* authSaga() {
  yield takeLatest(actionTypes.SIGNIN, signinSaga);
  yield takeLatest(actionTypes.SIGNUP, signupSaga);
  yield takeLatest(actionTypes.SIGNOUT, signoutSaga);
}

const initialState = {
  auth: null,
  authError: null,
};

const auth = handleActions(
  {
    [actionTypes.SIGNIN_SUCCESS]: (state, { payload: user }) => ({
      ...state,
      authError: null,
      auth: { type: 'SIGNIN', user },
    }),
    [actionTypes.SIGNIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
    [actionTypes.SIGNUP_SUCCESS]: (state, { payload: user }) => ({
      ...state,
      auth: { type: 'SIGNUP', user },
      authError: null,
    }),
    [actionTypes.SIGNUP_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
    [actionTypes.SIGNOUT_SUCCESS]: (state) => ({
      ...state,
      auth: null,
      authError: null,
    }),
    [actionTypes.SIGNOUT_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
  },
  initialState,
);

export default auth;
