import { combineReducers } from 'redux';
import channel from './channel';
import meta from './meta';
import message from './messages';

const rootReducer = combineReducers({
  channel,
  meta,
  message,
});

export default rootReducer;
