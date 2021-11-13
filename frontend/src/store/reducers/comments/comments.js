import { handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import * as actionTypes from '../../actions/actionTypes';
import createRequestSaga from '../../../components/comment/createRequestSaga';
import * as commentAPI from '../../../lib/api/comments';

const getRoomCommentsSaga = createRequestSaga(
  actionTypes.GETROOMCOMMENTS,
  commentAPI.comments,
);
const getMeetingCommentsSaga = createRequestSaga(
  actionTypes.GETMEETINGCOMMENTS,
  commentAPI.comments,
);
const createCommentSaga = createRequestSaga(
  actionTypes.CREATECOMMENT,
  commentAPI.comments,
);
const editCommentSaga = createRequestSaga(
  actionTypes.EDITCOMMENT,
  commentAPI.comments,
);
const deleteCommentSaga = createRequestSaga(
  actionTypes.DELETECOMMENT,
  commentAPI.comments,
);
export function* commentSaga() {
  yield takeLatest(actionTypes.GETROOMCOMMENTS, getRoomCommentsSaga);
  yield takeLatest(actionTypes.GETMEETINGCOMMENTS, getMeetingCommentsSaga);
  yield takeLatest(actionTypes.CREATECOMMENT, createCommentSaga);
  yield takeLatest(actionTypes.EDITCOMMENT, editCommentSaga);
  yield takeLatest(actionTypes.DELETECOMMENT, deleteCommentSaga);
}

const initialState = {
  comments: null,
  error: null,
};

const comments = handleActions(
  {
    [actionTypes.GETROOMCOMMENTS_SUCCESS]: (
      state,
      { payload: roomComments },
    ) => ({
      ...state,
      comments: roomComments,
      error: null,
    }),
    [actionTypes.GETROOMCOMMENTS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [actionTypes.GETMEETINGCOMMENTS_SUCCESS]: (
      state,
      { payload: meetingComments },
    ) => ({
      ...state,
      comments: meetingComments,
    }),
    [actionTypes.GETMEETINGCOMMENTS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [actionTypes.CREATECOMMENT_SUCCESS]: (state, { payload: newComment }) => ({
      ...state,
      comments: [...state.comments, newComment],
      error: null,
    }),
    [actionTypes.CREATECOMMENT_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [actionTypes.EDITCOMMENT_SUCCESS]: (
      state,
      { payload: modifiedComment },
    ) => ({
      ...state,
      comments: state.comments.map((comment) =>
        modifiedComment.id === comment.id ? modifiedComment : comment,
      ),
      error: null,
    }),
    [actionTypes.EDITCOMMENT_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [actionTypes.DELETECOMMENT_SUCCESS]: (
      state,
      { payload: deletedComment },
    ) => ({
      ...state,
      comments: state.comments.filter(
        (comment) => deletedComment !== comment.id,
      ),
      error: null,
    }),
    [actionTypes.DELETECOMMENT_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState,
);

export default comments;
