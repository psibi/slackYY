import { combineReducers } from 'redux';
import channel from './channel';
import meta from './meta';

const rootReducer = combineReducers({
  channel,
  meta,
});

export default rootReducer;
