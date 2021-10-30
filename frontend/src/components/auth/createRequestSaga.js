import { put } from 'redux-saga/effects';
import axios from 'axios';
import { startLoading, finishLoading } from '../../store/actions/loading';
import * as actionTypes from '../../store/actions/actionTypes';
import { token } from '../../lib/api/auth';

function getCookie(name) {
  let cookieValue;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i += 1) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === `${name}=`) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

export default function createRequestSaga(type, request) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  // eslint-disable-next-line func-names
  return function* (action) {
    let err = null;
    let response = null;
    let csrftoken = null;
    yield put(startLoading(type));

    yield axios.get(token).then(() => {
      csrftoken = getCookie('csrftoken');
      axios.defaults.headers.common['X-CSRFTOKEN'] = csrftoken;
    });

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
          yield put({
            type: SUCCESS,
            payload: response,
          });
        } else {
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
          yield put({
            type: SUCCESS,
            payload: response,
          });
        } else {
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
          yield put({ type: SUCCESS });
        } else {
          yield put({ type: FAILURE, payload: err });
        }
        break;

      default:
        break;
    }

    yield put(finishLoading(type));
  };
}
