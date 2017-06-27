import { RECEIVE_CHANNEL } from './types';
import {
  checkStatus,
} from '../helpers/utils';

export function fetchChannel() {
  console.log('channel fkaj');
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

export const receiveChannel = (json) => ({
  type: RECEIVE_CHANNEL,
  data: json,
});
