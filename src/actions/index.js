import * as types from '../constants/ActionTypes';
import 'isomorphic-fetch';
import config from '../common/config';
import constants from '../constants/Constants';

// 调接口公共方法
function fetchApiCommon(url) {
  return fetch(config.adminApiUrl + url)
    .then(response => {
      if (response.status >= 200 && response.status <= 304) {
        return response;
      } else {
        var error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
    })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log('fetch failed! ' + url, error);
    });
}

export function fetchNavigationBar() {
  return (dispatch, getState) => {
    const url = `/nav`;
    return fetchApiCommon(url)
      .then(response => {
        if (response.code === constants.API_CODE.SUCCESS) {
          dispatch({
            type: types.FETCH_NAV_SUCCESS,
            data: response.data
          });
        } else {
          dispatch({
            type: types.FETCH_NAV_FAILURE,
          });
        }
      });
  }
}
