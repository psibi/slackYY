import { 
  RECEIVE_CHANNEL_MESSAGE,
  UPDATE_MESSAGE,
} from '../actions/types';

const initialMessageState = {
  messageData: {},
};

function message(state = initialMessageState, action) {
  switch (action.type) {
    case RECEIVE_CHANNEL_MESSAGE:
      return {
        ...state,
        messageData: {
          ...state.messageData,
          [action.channelId]: action.data,
        }
      };
    case UPDATE_MESSAGE:
      return state;
    default:
      return state;
  }
}

export default message;
