/* eslint-disable no-undef */
import { createAction } from 'redux-actions';
import meetings, { meetingSaga } from './meetings';
import * as actionTypes from '../../actions/actionTypes';

let initialState;

describe('meetings reducer', () => {
  beforeEach(() => {
    initialState = {
      meetings: null,
      submitted: -1,
      meetingsError: null,
    };
  });

  it('should update meetings when GETMEETINGS SUCCEED', () => {
    const succeedGetMeetings = createAction(
      actionTypes.GETMEETINGS_SUCCESS,
      (meetings_) => meetings_,
    );
    expect(meetings(initialState, succeedGetMeetings([{ id: 1 }]))).toEqual({
      meetings: [{ id: 1 }],
      submitted: -1,
      meetingsError: null,
    });
  });

  it('should update meetings when CREATEMEETING SUCCEED', () => {
    initialState.meetings = [{ id: 1 }];
    const succeedCreateMeeting = createAction(
      actionTypes.CREATEMEETING_SUCCESS,
      (meetings_) => meetings_,
    );
    expect(meetings(initialState, succeedCreateMeeting({ id: 2 }))).toEqual({
      meetings: [{ id: 1 }, { id: 2 }],
      submitted: 2,
      meetingsError: null,
    });
  });

  it('should update meetings when EDITMEETING SUCCEED', () => {
    initialState.meetings = [
      { id: 1, content: 't' },
      { id: 2, content: 't' },
    ];
    const succeedEditMeeting = createAction(
      actionTypes.EDITMEETING_SUCCESS,
      (meetings_) => meetings_,
    );
    expect(
      meetings(initialState, succeedEditMeeting({ id: 1, content: 'new' })),
    ).toEqual({
      meetings: [
        { id: 1, content: 'new' },
        { id: 2, content: 't' },
      ],
      submitted: -1,
      meetingsError: null,
    });
  });

  it('should update meetings when DELETEMEETING SUCCEED', () => {
    initialState.meetings = [{ id: 1 }, { id: 2 }];
    const succeedDeleteMeeting = createAction(
      actionTypes.DELETEMEETING_SUCCESS,
      (id) => id,
    );
    expect(meetings(initialState, succeedDeleteMeeting(1))).toEqual({
      meetings: [{ id: 2 }],
      submitted: -1,
      meetingsError: null,
    });
  });

  it('should update meetings when JOINMEETING SUCCEED', () => {
    initialState.meetings = [
      { id: 1, currentMembers: [1] },
      { id: 2, currentMembers: [1] },
    ];
    const succeedJoinMeeting = createAction(
      actionTypes.JOINMEETING_SUCCESS,
      (meetings_) => meetings_,
    );
    expect(
      meetings(
        initialState,
        succeedJoinMeeting({ id: 1, currentMembers: [1, 2] }),
      ),
    ).toEqual({
      meetings: [
        { id: 1, currentMembers: [1, 2] },
        { id: 2, currentMembers: [1] },
      ],
      submitted: -1,
      meetingsError: null,
    });
  });

  it('should update meetings when QUITMEETING SUCCEED', () => {
    initialState.meetings = [
      { id: 1, currentMembers: [1, 2] },
      { id: 2, currentMembers: [1] },
    ];
    const succeedQuitMeeting = createAction(
      actionTypes.QUITMEETING_SUCCESS,
      (meetings_) => meetings_,
    );
    expect(
      meetings(
        initialState,
        succeedQuitMeeting({ id: 1, currentMembers: [1] }),
      ),
    ).toEqual({
      meetings: [
        { id: 1, currentMembers: [1] },
        { id: 2, currentMembers: [1] },
      ],
      submitted: -1,
      meetingsError: null,
    });
  });

  it('should raise error when GETMEETINGS FAILED', () => {
    const failGetMeetings = createAction(
      actionTypes.GETMEETINGS_FAILURE,
      (error) => error,
    );
    expect(meetings(initialState, failGetMeetings('error'))).toEqual({
      meetings: null,
      submitted: -1,
      meetingsError: 'error',
    });
  });

  it('should raise error when CREATEMEETING FAILED', () => {
    const failCreateMeeting = createAction(
      actionTypes.CREATEMEETING_FAILURE,
      (error) => error,
    );
    expect(meetings(initialState, failCreateMeeting('error'))).toEqual({
      meetings: null,
      submitted: -1,
      meetingsError: 'error',
    });
  });

  it('should raise error when EDITMEETING FAILED', () => {
    const failEditMeeting = createAction(
      actionTypes.EDITMEETING_FAILURE,
      (error) => error,
    );
    expect(meetings(initialState, failEditMeeting('error'))).toEqual({
      meetings: null,
      submitted: -1,
      meetingsError: 'error',
    });
  });

  it('should raise error when DELETEMEETING FAILED', () => {
    const failDeleteMeeting = createAction(
      actionTypes.DELETEMEETING_FAILURE,
      (error) => error,
    );
    expect(meetings(initialState, failDeleteMeeting('error'))).toEqual({
      meetings: null,
      submitted: -1,
      meetingsError: 'error',
    });
  });

  it('should raise error when JOINMEETING FAILED', () => {
    const failJoinMeeting = createAction(
      actionTypes.JOINMEETING_FAILURE,
      (error) => error,
    );
    expect(meetings(initialState, failJoinMeeting('error'))).toEqual({
      meetings: null,
      submitted: -1,
      meetingsError: 'error',
    });
  });

  it('should raise error when QUITMEETING FAILED', () => {
    const failQuitMeeting = createAction(
      actionTypes.QUITMEETING_FAILURE,
      (error) => error,
    );
    expect(meetings(initialState, failQuitMeeting('error'))).toEqual({
      meetings: null,
      submitted: -1,
      meetingsError: 'error',
    });
  });

  it('should have meetingsSaga', () => {
    const gen = meetingSaga();
    gen.next();
    gen.next();
    gen.next();
    gen.next();
    gen.next();
    gen.next();
    expect(gen.next().done).toBe(true);
  });
});
