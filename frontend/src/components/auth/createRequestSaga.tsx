import { put } from 'redux-saga/effects';
import axios from 'axios';
import { startLoading, finishLoading } from '../../store/actions/loading';
import * as actionTypes from '../../store/actions/actionTypes';

export default function createRequestSaga(type, request) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return function* (action) {
    let err = null;
    let response = null;
    yield put(startLoading(type));

    switch (type) {
      case actionTypes.LOGIN:
        const { email, password } = action.payload;
        if (email !== 'swpp@snu.ac.kr' || password !== 'iluvswpp') {
          err = 'Email or password is wrong';
        }
        if (!err) {
          yield axios.put(request, {
            id: 1,
            email: 'swpp@snu.ac.kr',
            password: 'iluvswpp',
            name: 'Software Lover',
            logged_in: true,
          });
          yield put({
            type: SUCCESS,
            payload: {
              id: 1,
              email: 'swpp@snu.ac.kr',
              password: 'iluvswpp',
              name: 'Software Lover',
              logged_in: true,
            },
          });
        } else {
          alert('Email or password is wrong');
          yield put({
            type: FAILURE,
            payload: err,
            error: true,
          });
        }
        break;

      default:
        break;
    }

    yield put(finishLoading(type));
  };
}
