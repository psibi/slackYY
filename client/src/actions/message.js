import { 
  RECEIVE_CHANNEL_MESSAGE,
  UPDATE_MESSAGE,
} from './types';
import {
  checkStatus,
} from '../helpers/utils';

export function fetchMessage(channelId) {
  return (dispatch) => {
    return fetch(`/message?channel=${channelId}`)
      .then(checkStatus)
      .then(response => response.json())
      .then((json) => {
        dispatch(receiveMessage(channelId, json));
      })
      .catch(() => {
        dispatch(receiveMessage(channelId, []));
      });
  };
}

export function createMessage(msg, channelId) {
  return (dispatch) => {
    return fetch('/message/create', {
      method: 'POST',
      body: JSON.stringify(
        {
          msg: msg, 
          userName: 'Chika',
          channel: channelId,
        }),
    })
      .then(checkStatus)
      .then(response => response.json())
      .then((data) => {
        dispatch(updateMessage(data))
      });
  }
}

export const receiveMessage = (channelId, json) => ({
  type: RECEIVE_CHANNEL_MESSAGE,
  data: json,
  channelId,
});

export const updateMessage = (json) => ({
  type: UPDATE_MESSAGE,
  data: json,
});
