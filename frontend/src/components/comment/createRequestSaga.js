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
      case actionTypes.GETCOMMENTS:
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

      case actionTypes.CREATECOMMENT:
        yield axios
          .post(request, {
            authorId: action.payload.authorId,
            articleId: action.payload.articleId,
            content: action.payload.content,
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

      case actionTypes.EDITCOMMENT:
        yield axios
          .put(`${request}/${action.payload.commentId}`, {
            authorId: action.payload.authorId,
            articleId: action.payload.articleId,
            content: action.payload.content,
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

      case actionTypes.DELETECOMMENT:
        yield axios
          .delete(`${request}/${action.payload.commentId}`)
          .then((res) => {
            response = res;
          })
          .catch((error) => {
            err = error;
          });

        if (!err) {
          yield put({ type: SUCCESS, payload: action.payload.commentId });
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
