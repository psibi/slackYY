import { 
  RECEIVE_MESSAGE,
  UPDATE_MESSAGE,
} from './types';
import {
  checkStatus,
} from '../helpers/utils';

export function fetchMessage() {
  return (dispatch) => {
    return fetch('/message')
      .then(checkStatus)
      .then(response => response.json())
      .then((json) => {
        dispatch(receiveMessage(json));
      })
      .catch(() => {
        dispatch(receiveMessage([]));
      });
  };
}

export function createMessage(messageName) {
  return (dispatch) => {
    return fetch('/message/create', {
      method: 'POST',
      body: JSON.stringify({name: messageName}),
    })
      .then(checkStatus)
      .then(response => response.json())
      .then((data) => {
        dispatch(updateMessage(data))
      });
  }
}

export const receiveMessage = (json) => ({
  type: RECEIVE_MESSAGE,
  data: json,
});

export const updateMessage = (json) => ({
  type: UPDATE_MESSAGE,
  data: json,
});
