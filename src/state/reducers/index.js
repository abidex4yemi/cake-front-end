import { combineReducers } from 'redux';
import { reducer as flashReducer } from 'redux-flash';

import { userReducer } from './userReducer';

const rootReducer = combineReducers({
  data: userReducer,
  flash: flashReducer
});

export default rootReducer;
