import { 
  UPDATE_CURRENT_CHANNEL,
  UPDATE_USER_INFO,
} from './types';
import {
  checkStatus,
} from '../helpers/utils';

export function updateCurrentChannel(channelName, channelId) {
  return {
    type: UPDATE_CURRENT_CHANNEL,
    currentChannel: channelName,
    currentChannelId: channelId,
  }
}

export function updateUserInfo(user) {
  return {
    type: UPDATE_USER_INFO,
    user,
  };
}

export function fetchUser() {
  return (dispatch) => {
    return fetch(`/currentUser`, {
      method: 'GET',
      credentials: 'include',
    })
      .then(checkStatus)
      .then(response => response.json())
      .then((json) => {
        dispatch(updateUserInfo(json.user));
      })
      .catch(() => {
        dispatch(updateUserInfo({}));
      });
  };
}
