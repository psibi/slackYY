import { RECEIVE_CHANNEL } from '../actions/types';

const initialChannelState = {
  channelInfo: [],
};

function channel(state = initialChannelState, action) {
  switch (action.type) {
    case RECEIVE_CHANNEL:
      return {
        ...state,
        channelInfo: action.data,
      };
    default:
      return state;
  }
}

export default channel;
