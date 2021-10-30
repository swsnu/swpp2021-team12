import { createAction } from 'redux-actions';
import * as actionTypes from './actionTypes';

export const getMeetings = createAction(actionTypes.GETMEETINGS);

export const createMeeting = createAction(
  actionTypes.CREATEMEETING,
  ({ title, content, authorId }) => ({ title, content, authorId }),
);

export const editMeeting = createAction(
  actionTypes.EDITMEETING,
  ({ newTitle, newContent, meetingId, authorId }) => ({
    newTitle,
    newContent,
    meetingId,
    authorId,
  }),
);

export const deleteMeeting = createAction(
  actionTypes.DELETEMEETING,
  ({ id }) => ({ id }),
);

export const joinMeeting = createAction(
  actionTypes.JOINMEETING,
  ({ auth, meetingId }) => ({ auth, meetingId }),
);

export const quitMeeting = createAction(
  actionTypes.QUITMEETING,
  ({ auth, meetingId }) => ({ auth, meetingId }),
);