import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import auth, { authSaga } from './auth/auth';
import loading from './loading/loading';
import meetings, { meetingSaga } from './meetings/meetings';
import comments, { commentSaga } from './comments/comments';

const rootReducer = combineReducers({ auth, loading, meetings, comments });

export function* rootSaga() {
  yield all([authSaga(), meetingSaga(), commentSaga()]);
}

export default rootReducer;
