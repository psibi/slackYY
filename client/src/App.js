import React, { Component } from 'react';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import {
  createStore,
  applyMiddleware,
} from 'redux';
import { ChatHeader } from './components/chat/ChatHeader';
import { ChatFooter } from './components/chat/ChatFooter';
import MessageListings from './components/chat/MessageListings';
import { MessageHistory } from './components/chat/MessageHistory';
import rootReducer from './reducer';

let middleWare = [thunkMiddleware];
const loggerMiddleware = createLogger();
middleWare = [...middleWare, loggerMiddleware];

const store = createStore(
  rootReducer,
  applyMiddleware(...middleWare),
);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <ChatHeader />
          <div className="main">
            <MessageListings />
            <MessageHistory />
          </div>
          <ChatFooter />
        </div>
      </Provider>
    );
  }
}

export default App;
