import { 
  UPDATE_CURRENT_CHANNEL,
} from '../actions/types';

const initialChannelState = {
  currentChannel: null,
  currentChannelId: null,
};

function meta(state = initialChannelState, action) {
  switch (action.type) {
    case UPDATE_CURRENT_CHANNEL:
      return {
        ...state,
        currentChannel: action.currentChannel,
        currentChannelId: action.currentChannelId,
      };
    default:
      return state;
  }
}

export default meta;
