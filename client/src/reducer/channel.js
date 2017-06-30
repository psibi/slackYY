import
{ RECEIVE_CHANNEL,
  UPDATE_CHANNEL,
} from '../actions/types';

const initialChannelState = {
  channelInfo: [],
  messages: {},
};

function channel(state = initialChannelState, action) {
  switch (action.type) {
    case RECEIVE_CHANNEL:
      return {
        ...state,
        channelInfo: action.data,
      };
    case UPDATE_CHANNEL:
      return {
        ...state,
        channelInfo: [...state.channelInfo, action.data],
      };
    default:
      return state;
  }
}

export default channel;
