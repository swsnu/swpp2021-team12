import { createAction } from 'redux-actions';
import * as actionTypes from './actionTypes';

export const getMeetings = createAction(actionTypes.GETMEETINGS);

export const createMeeting = createAction(
  actionTypes.CREATEMEETING,
  ({ title, content, maxMembers }) => ({ title, content, maxMembers }),
);

export const editMeeting = createAction(
  actionTypes.EDITMEETING,
  ({ newTitle, newContent, newMaxMembers, meetingId }) => ({
    newTitle,
    newContent,
    newMaxMembers,
    meetingId,
  }),
);

export const deleteMeeting = createAction(
  actionTypes.DELETEMEETING,
  ({ id }) => ({ id }),
);

export const toggleMeeting = createAction(
  actionTypes.TOGGLEMEETING,
  ({ joinOrQuit, id }) => ({ joinOrQuit, id }),
);
