import { handleActions } from 'redux-actions';
import * as actionTypes from '../actions/actionTypes';
import createRequestSaga from '../../components/auth/createRequestSaga';
import { takeLatest } from 'redux-saga/effects';
import * as userAPI from '../../lib/api/user';

const loginSaga = createRequestSaga(actionTypes.LOGIN, userAPI.userdetail);
export function* authSaga() {
  yield takeLatest(actionTypes.LOGIN, loginSaga);
}

const initialState = {
  auth: null,
  authError: null,
};

const auth = handleActions(
  {
    [actionTypes.SIGNIN_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth: auth,
    }),
  },
  initialState,
);

export default auth;
