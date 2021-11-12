import { put } from 'redux-saga/effects';
import axios from 'axios';
import { startLoading, finishLoading } from '../../store/actions/loading';
import * as actionTypes from '../../store/actions/actionTypes';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export default function createRequestSaga(type, request) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  // eslint-disable-next-line func-names
  return function* (action) {
    let err = null;
    let response = null;
    yield put(startLoading(type));

    switch (type) {
      case actionTypes.SIGNIN:
        yield axios
          .post(request, {
            email: action.payload.email,
            password: action.payload.password,
          })
          .then((res) => {
            response = res.data;
          })
          .catch((error) => {
            err = error;
          });
        if (!err) {
          localStorage.user = response.id;
          yield put({
            type: SUCCESS,
            payload: response.id,
          });
        } else {
          localStorage.clear();
          yield put({
            type: FAILURE,
            payload: {
              error: err,
            },
          });
        }
        break;

      case actionTypes.SIGNUP:
        yield axios
          .post(request, {
            email: action.payload.email,
            name: action.payload.name,
            password: action.payload.password,
          })
          .then((res) => {
            response = res.data;
          })
          .catch((error) => {
            err = error;
          });
        if (!err) {
          localStorage.user = response.id;
          yield put({
            type: SUCCESS,
            payload: response.id,
          });
        } else {
          localStorage.clear();
          yield put({
            type: FAILURE,
            payload: err,
          });
        }
        break;

      case actionTypes.SIGNOUT:
        yield axios.get(request).catch((error) => {
          err = error;
        });
        if (!err) {
          localStorage.clear();
          yield put({ type: SUCCESS });
        } else {
          localStorage.clear();
          yield put({ type: FAILURE, payload: err });
        }
        break;

      case actionTypes.CHECKSIGNIN:
        yield axios.get(request).catch((error) => {
          err = error;
        });
        if (!err) {
          yield put({ type: SUCCESS, payload: action.payload.id });
        } else {
          localStorage.clear();
          yield put({ type: FAILURE, payload: err });
        }

        break;

      default:
        break;
    }

    yield put(finishLoading(type));
  };
}
