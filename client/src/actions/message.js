import {
  RECEIVE_CHANNEL_MESSAGE,
  UPDATE_MESSAGE,
  RECEIVE_CHAT_MESSAGE,
} from './types';
import {
  checkStatus,
} from '../helpers/utils';

const { io } = window;

export const receiveMessage = (channelId, json) => ({
  type: RECEIVE_CHANNEL_MESSAGE,
  data: json,
  channelId,
});

export const updateMessage = json => ({
  type: UPDATE_MESSAGE,
  data: json,
});

export const receivedChatMessage = message => ({
  type: RECEIVE_CHAT_MESSAGE,
  message,
});

export function fetchMessage(channelId) {
  return dispatch =>
    fetch(`/message?channel=${channelId}`)
      .then(checkStatus)
      .then(response => response.json())
      .then((json) => {
        dispatch(receiveMessage(channelId, json));
      })
      .catch(() => {
        dispatch(receiveMessage(channelId, []));
      });
}


export function createMessage(msg, channelId, channelName, user) {
  return dispatch =>
    fetch('/message/create', {
      method: 'POST',
      body: JSON.stringify(
        {
          msg,
          userName: user.name,
          channel: channelId,
        }),
    })
      .then(checkStatus)
      .then(response => response.json())
      .then((data) => {
        dispatch(updateMessage(data));
        io.socket.get('/chat/channel/message', {
          channelId,
          msg,
          channelName,
        });
      });
}
