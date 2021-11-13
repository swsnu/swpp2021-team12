import { put } from 'redux-saga/effects';
import axios from 'axios';
import { startLoading, finishLoading } from '../../store/actions/loading';
import * as actionTypes from '../../store/actions/actionTypes';

export default function createRequestSaga(type, request) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  // eslint-disable-next-line func-names
  return function* (action) {
    let err = null;
    let response = null;
    yield put(startLoading(type));

    switch (type) {
      case actionTypes.GETMEETINGS:
        yield axios
          .get(request)
          .then((res) => {
            response = res.data;
          })
          .catch((error) => {
            err = error;
          });

        if (!err) {
          yield put({ type: SUCCESS, payload: response });
        } else {
          yield put({ type: FAILURE, payload: { error: err } });
        }
        break;

      case actionTypes.CREATEMEETING:
        yield axios
          .post(request, {
            title: action.payload.title,
            content: action.payload.content,
            maxMembers: action.payload.maxMembers,
          })
          .then((res) => {
            response = res.data;
          })
          .catch((error) => {
            err = error;
          });
        if (!err) {
          yield put({ type: SUCCESS, payload: response });
        } else {
          yield put({ type: FAILURE, payload: { error: err } });
        }
        break;

      case actionTypes.EDITMEETING:
        console.log(action);
        yield axios
          .put(`${request}${action.payload.meetingId}/`, {
            title: action.payload.newTitle,
            content: action.payload.newContent,
            maxMembers: action.payload.newMaxMembers,
          })
          .then((res) => {
            response = res.data;
          })
          .catch((error) => {
            err = error;
          });
        if (!err) {
          yield put({ type: SUCCESS, payload: response });
        } else {
          yield put({ type: FAILURE, payload: { error: err } });
        }
        break;

      case actionTypes.DELETEMEETING:
        yield axios
          .delete(`${request}${action.payload.id}/`)
          .then((res) => {
            response = res;
          })
          .catch((error) => {
            err = error;
          });
        if (!err) {
          yield put({ type: SUCCESS, payload: action.payload.id });
        } else {
          yield put({ type: FAILURE, payload: { error: err } });
        }
        break;

      case actionTypes.TOGGLEMEETING:
        yield axios
          .put(`${request}/${action.payload.id}/toggle/`, {
            joinOrQuit: action.payload.joinOrQuit,
          })
          .then((res) => {
            response = res.data;
          })
          .catch((error) => {
            err = error;
          });
        if (!err) {
          yield put({ type: SUCCESS, payload: response });
        } else {
          yield put({ type: FAILURE, payload: { error: err } });
        }
        break;

      default:
        break;
    }

    yield put(finishLoading(type));
  };
}
