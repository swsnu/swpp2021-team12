import { handleActions } from 'redux-actions';
import * as actionTypes from '../../actions/actionTypes';

const initialState = {};

const loading = handleActions(
  {
    [actionTypes.START_LOADING]: (state, action) => ({
      ...state,
      [action.payload]: true,
    }),
    [actionTypes.FINISH_LOADING]: (state, action) => ({
      ...state,
      [action.payload]: false,
    }),
  },
  initialState,
);

export default loading;
