import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import userInfo from './userInfo';

const rootReducer = combineReducers({
  userInfo,
  routing
});

module.exports = rootReducer;
