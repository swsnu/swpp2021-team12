import { createAction } from 'redux-actions';
import * as actionTypes from './actionTypes';

export const getMeetings = createAction(actionTypes.GETMEETINGS);

export const createMeeting = createAction(
  actionTypes.CREATEMEETING,
  ({ title, content, authorId }) => ({ title, content, authorId }),
);

export const editMeeting = createAction(
  actionTypes.EDITMEETING,
  ({ newTitle, newContent, meetingId, authId }) => ({
    newTitle,
    newContent,
    meetingId,
    authId,
  }),
);

export const deleteMeeting = createAction(
  actionTypes.DELETEMEETING,
  ({ id }) => ({ id }),
);
