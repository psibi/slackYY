import { 
  RECEIVE_CHANNEL,
  UPDATE_CHANNEL,
} from './types';
import {
  checkStatus,
} from '../helpers/utils';

export function fetchChannel() {
  return (dispatch) => {
    return fetch('/channel')
      .then(checkStatus)
      .then(response => response.json())
      .then((json) => {
        dispatch(receiveChannel(json));
      })
      .catch(() => {
        dispatch(receiveChannel([]));
      });
  };
}

export function createChannel(channelName) {
  return (dispatch) => {
    return fetch('/channel/create', {
      method: 'POST',
      body: JSON.stringify({name: channelName}),
    })
      .then(checkStatus)
      .then(response => response.json())
      .then((data) => {
        dispatch(updateChannel(data))
      });
  }
}

export const receiveChannel = (json) => ({
  type: RECEIVE_CHANNEL,
  data: json,
});

export const updateChannel = (json) => ({
  type: UPDATE_CHANNEL,
  data: json,
});
