import { 
  UPDATE_CURRENT_CHANNEL,
  UPDATE_USER_INFO,
} from '../actions/types';

const initialChannelState = {
  currentChannel: null,
  currentChannelId: null,
  currentUser: {},
};

function meta(state = initialChannelState, action) {
  switch (action.type) {
    case UPDATE_CURRENT_CHANNEL:
      return {
        ...state,
        currentChannel: action.currentChannel,
        currentChannelId: action.currentChannelId,
      };
    case UPDATE_USER_INFO: 
      return {
        ...state,
        currentUser: action.user
      };
    default:
      return state;
  }
}

export default meta;
