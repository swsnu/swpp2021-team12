import { createAction } from 'redux-actions';
import * as actionTypes from './actionTypes';

export const getRoomComments = createAction(actionTypes.GETROOMCOMMENTS);
export const getMeetingComments = createAction(actionTypes.GETMEETINGCOMMENTS);
export const createComment = createAction(
  actionTypes.CREATECOMMENT,
  ({ content, authorId, articleId }) => ({ content, authorId, articleId }),
);
export const editComment = createAction(
  actionTypes.EDITCOMMENT,
  ({ content, authorId, articleId, commentId }) => ({
    content,
    authorId,
    articleId,
    commentId,
  }),
);
export const deleteComment = createAction(
  actionTypes.DELETECOMMENT,
  ({ commentId }) => ({ commentId }),
);
