import * as types from '../constants/ActionTypes';

export default function userInfo(state = {}, action) {
  switch (action.type) {
    case types.FETCH_USER_INFO_SUCCESS:
      return Object.assign({}, state, action.data);
    case types.FETCH_USER_INFO_FAILURE:
      return state;
    default:
      return state;
  }
}
