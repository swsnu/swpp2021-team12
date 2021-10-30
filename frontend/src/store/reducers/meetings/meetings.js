/* eslint-disable import/no-named-as-default */
import { handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import * as actionTypes from '../../actions/actionTypes';
import createRequestSaga from '../../../components/meeting/createRequestSaga';
import * as meetingsAPI from '../../../lib/api/meetings';

const getMeetingsSaga = createRequestSaga(
  actionTypes.GETMEETINGS,
  meetingsAPI.meetings,
);

const createMeetingSaga = createRequestSaga(
  actionTypes.CREATEMEETING,
  meetingsAPI.meetings,
);

const editMeetingSaga = createRequestSaga(
  actionTypes.EDITMEETING,
  meetingsAPI.meetings,
);

const deleteMeetingSaga = createRequestSaga(
  actionTypes.DELETEMEETING,
  meetingsAPI.meetings,
);

const joinMeetingSaga = createRequestSaga(
  actionTypes.JOINMEETING,
  meetingsAPI.meetings,
);

const quitMeetingSaga = createRequestSaga(
  actionTypes.QUITMEETING,
  meetingsAPI.meetings,
);

export function* meetingSaga() {
  yield takeLatest(actionTypes.GETMEETINGS, getMeetingsSaga);
  yield takeLatest(actionTypes.CREATEMEETING, createMeetingSaga);
  yield takeLatest(actionTypes.EDITMEETING, editMeetingSaga);
  yield takeLatest(actionTypes.DELETEMEETING, deleteMeetingSaga);
  yield takeLatest(actionTypes.JOINMEETING, joinMeetingSaga);
  yield takeLatest(actionTypes.QUITMEETING, quitMeetingSaga);
}

const initialState = {
  meetings: null,
  submitted: -1,
  meetingsError: null,
};

const meetings = handleActions(
  {
    [actionTypes.GETMEETINGS_SUCCESS]: (state, { payload: meetingList }) => ({
      ...state,
      meetings: meetingList,
      submitted: -1,
      meetingsError: null,
    }),
    [actionTypes.GETMEETINGS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      meetings: null,
      submitted: -1,
      meetingsError: error,
    }),
    [actionTypes.CREATEMEETING_SUCCESS]: (
      state,
      { payload: createdMeeting },
    ) => ({
      ...state,
      meetings: [...state.meetings, createdMeeting],
      submitted: createdMeeting.id,
      meetingsError: null,
    }),
    [actionTypes.CREATEMEETING_FAILURE]: (state, { payload: error }) => ({
      ...state,
      submitted: -1,
      meetingsError: error,
    }),
    [actionTypes.EDITMEETING_SUCCESS]: (
      state,
      { payload: modifiedMeeting },
    ) => ({
      ...state,
      meetings: state.meetings.map((meeting) =>
        meeting.id === modifiedMeeting.id ? modifiedMeeting : meeting,
      ),
      submitted: -1,
      meetingsError: null,
    }),
    [actionTypes.EDITMEETING_FAILURE]: (state, { payload: error }) => ({
      ...state,
      submitted: -1,
      meetingsError: error,
    }),
    [actionTypes.DELETEMEETING_SUCCESS]: (
      state,
      { payload: deletedMeeting },
    ) => ({
      ...state,
      meetings: state.meetings.filter(
        (meeting) => meeting.id !== deletedMeeting,
      ),
      submitted: -1,
      meetingsError: null,
    }),
    [actionTypes.DELETEMEETING_FAILURE]: (state, { payload: error }) => ({
      ...state,
      submitted: -1,
      meetingsError: error,
    }),
    [actionTypes.JOINMEETING_SUCCESS]: (
      state,
      { payload: modifiedMeeting },
    ) => ({
      ...state,
      meetings: state.meetings.map((meeting) =>
        meeting.id === modifiedMeeting.id ? modifiedMeeting : meeting,
      ),
      submitted: -1,
      meetingsError: null,
    }),
    [actionTypes.JOINMEETING_FAILURE]: (state, { payload: error }) => ({
      ...state,
      submitted: -1,
      meetingsError: error,
    }),
    [actionTypes.QUITMEETING_SUCCESS]: (
      state,
      { payload: modifiedMeeting },
    ) => ({
      ...state,
      meetings: state.meetings.map((meeting) =>
        meeting.id === modifiedMeeting.id ? modifiedMeeting : meeting,
      ),
      submitted: -1,
      meetingsError: null,
    }),
    [actionTypes.QUITMEETING_FAILURE]: (state, { payload: error }) => ({
      ...state,
      submitted: -1,
      meetingsError: error,
    }),
  },
  initialState,
);

export default meetings;
