import { RECEIVE_CHANNEL } from '../actions/types';

const initialChannelState = {
  channel: [],
};

function channel(state = initialChannelState, action) {
  switch (action.type) {
    case RECEIVE_CHANNEL:
      return {
        ...state,
        channel: action.data,
      };
    default:
      return state;
  }
}

export default channel;
