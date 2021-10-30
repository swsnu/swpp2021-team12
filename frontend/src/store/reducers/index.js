import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import auth, { authSaga } from './auth/auth';
import loading from './loading/loading';
import meetings, { meetingSaga } from './meetings/meetings';

const rootReducer = combineReducers({ auth, loading, meetings });

export function* rootSaga() {
  yield all([authSaga(), meetingSaga()]);
}

export default rootReducer;
