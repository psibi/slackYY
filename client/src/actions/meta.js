import { UPDATE_CURRENT_CHANNEL } from './types';

export function updateCurrentChannel(channelName, channelId) {
  return {
    type: UPDATE_CURRENT_CHANNEL,
    currentChannel: channelName,
    currentChannelId: channelId,
  }
}
