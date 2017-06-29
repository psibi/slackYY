import React, { Component } from 'react';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import {
  createStore,
  applyMiddleware,
} from 'redux';
import { Navbar } from './components/chat/Navbar';
import Menu from './components/chat/Menu';
import Chat from './components/chat/Chat';
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
        <section>
          <Navbar />
          <Menu />
          <Chat />
        </section>
      </Provider>
    );
  }
}

export default App;
