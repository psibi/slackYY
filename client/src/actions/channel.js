import _ from 'lodash';
import {
  RECEIVE_CHANNEL,
  UPDATE_CHANNEL,
} from './types';
import {
  checkStatus,
} from '../helpers/utils';
import { updateCurrentChannel } from './meta';

const { io } = window;

export const receiveChannel = json => ({
  type: RECEIVE_CHANNEL,
  data: json,
});

export const updateChannel = json => ({
  type: UPDATE_CHANNEL,
  data: json,
});

export function joinChannels(channels) {
  return () => {
    _.map(channels, (channel) => {
      io.socket.get('/chat/channel/join', {
        channelName: channel.name,
      }, () => {});
    });
  };
}

export function fetchChannel() {
  return dispatch => fetch('/channel')
    .then(checkStatus)
    .then(response => response.json())
    .then((json) => {
      dispatch(receiveChannel(json));
      dispatch(joinChannels(json));
      if (json.length >= 1) {
        const firstChannel = json[0];
        dispatch(updateCurrentChannel(firstChannel.name, firstChannel.id));
      }
    })
    .catch(() => {
      dispatch(receiveChannel([]));
    });
}


export function createChannel(channelName) {
  return dispatch =>
    fetch('/channel/create', {
      method: 'POST',
      body: JSON.stringify({ name: channelName }),
    })
      .then(checkStatus)
      .then(response => response.json())
      .then((data) => {
        dispatch(updateChannel(data));
        dispatch(updateCurrentChannel(channelName, data.id));
      });
}
