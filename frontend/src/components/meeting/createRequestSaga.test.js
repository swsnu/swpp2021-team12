/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-undef */
import { runSaga } from 'redux-saga';
import * as axios from 'axios';
import createRequestSaga from './createRequestSaga';
import * as actionTypes from '../../store/actions/actionTypes';

jest.mock('axios');
describe('Saga of meeting', () => {
  it('should work on GETMEETINGS', async () => {
    const dummyMeetings = [
      { id: 1, title: 'tt', content: 'tc', authorId: 1, maxMembers: 4 },
    ];
    axios.get.mockImplementation(() =>
      Promise.resolve({ data: dummyMeetings }),
    );
    const dispatched = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      createRequestSaga(actionTypes.GETMEETINGS, '/api/meeting'),
    );
    expect(dispatched).toEqual([
      { payload: 'meetings/GETMEETINGS', type: 'loading/START_LOADING' },
    ]);
  });

  it('should work on CREATEMEETING', async () => {
    const dummyMeetings = [
      { id: 1, title: 'tt', content: 'tc', authorId: 1, maxMembers: 4 },
    ];
    axios.post.mockImplementation(() =>
      Promise.resolve({ data: dummyMeetings }),
    );
    const dispatched = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      createRequestSaga(actionTypes.CREATEMEETING, '/api/meeting'),
      { payload: { title: 'tt', content: 'tc', authorId: 1, maxMembers: 4 } },
    );
    expect(dispatched).toEqual([
      { payload: 'meetings/CREATEMEETING', type: 'loading/START_LOADING' },
    ]);
  });

  it('should work on EDITMEETING', async () => {
    const dummyMeetings = [
      { id: 1, title: 'tt', content: 'tc', authorId: 1, maxMembers: 4 },
    ];
    axios.put.mockImplementation(() =>
      Promise.resolve({ data: dummyMeetings }),
    );
    const dispatched = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      createRequestSaga(actionTypes.EDITMEETING, '/api/meeting'),
      {
        payload: {
          newTitle: 'tt',
          newContent: 'tc',
          authorId: 1,
          meetingId: 1,
        },
      },
    );
    expect(dispatched).toEqual([
      { payload: 'meetings/EDITMEETING', type: 'loading/START_LOADING' },
    ]);
  });

  it('should work on DELETEMEETING', async () => {
    const dummyMeetings = [
      { id: 1, title: 'tt', content: 'tc', authorId: 1, maxMembers: 4 },
    ];
    axios.delete.mockImplementation(() =>
      Promise.resolve({ data: dummyMeetings }),
    );
    const dispatched = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      createRequestSaga(actionTypes.DELETEMEETING, '/api/meeting'),
      {
        payload: {
          id: 1,
        },
      },
    );
    expect(dispatched).toEqual([
      { payload: 'meetings/DELETEMEETING', type: 'loading/START_LOADING' },
    ]);
  });

  it('should fail on GETMEETINGS', async () => {
    axios.get.mockImplementation(() => Promise.reject({ status: 500 }));
    const dispatched = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      createRequestSaga(actionTypes.GETMEETINGS, '/api/meeting'),
    );
    expect(dispatched).toEqual([
      { payload: 'meetings/GETMEETINGS', type: 'loading/START_LOADING' },
    ]);
  });

  it('should fail on CREATEMEETING', async () => {
    axios.post.mockImplementation(() => Promise.reject({ status: 500 }));
    const dispatched = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      createRequestSaga(actionTypes.CREATEMEETING, '/api/meeting'),
      {
        payload: {
          title: 'tt',
          content: 'tc',
          authorId: 1,
          maxMembers: 4,
        },
      },
    );
    expect(dispatched).toEqual([
      { payload: 'meetings/CREATEMEETING', type: 'loading/START_LOADING' },
    ]);
  });

  it('should fail on EDITMEETING', async () => {
    axios.put.mockImplementation(() => Promise.reject({ status: 500 }));
    const dispatched = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      createRequestSaga(actionTypes.EDITMEETING, '/api/meeting'),
      {
        payload: {
          newTitle: 'tt',
          newContent: 'tc',
          authorId: 1,
          articleId: 1,
        },
      },
    );
    expect(dispatched).toEqual([
      { payload: 'meetings/EDITMEETING', type: 'loading/START_LOADING' },
    ]);
  });

  it('should fail on DELETEMEETING', async () => {
    axios.delete.mockImplementation(() => Promise.reject({ status: 500 }));
    const dispatched = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      createRequestSaga(actionTypes.DELETEMEETING, '/api/meeting'),
      {
        payload: {
          id: 1,
        },
      },
    );
    expect(dispatched).toEqual([
      { payload: 'meetings/DELETEMEETING', type: 'loading/START_LOADING' },
    ]);
  });

  it('should have default case', async () => {
    const dispatched = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      createRequestSaga('none', '/api/meeting'),
    );
    expect(dispatched).toEqual([
      {
        payload: 'none',
        type: 'loading/START_LOADING',
      },
      {
        payload: 'none',
        type: 'loading/FINISH_LOADING',
      },
    ]);
  });
});
