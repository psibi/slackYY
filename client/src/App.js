import React, { Component } from 'react';
import { ChatHeader } from './components/chat/ChatHeader';
import { ChatFooter } from './components/chat/ChatFooter';
import MessageListings from './components/chat/MessageListings';
import { MessageHistory } from './components/chat/MessageHistory';

class App extends Component {
  render() {
    return (
      <div>
        <ChatHeader />
        <div className="main">
          <MessageListings />
          <MessageHistory />
        </div>
        <ChatFooter />
      </div>
    );
  }
}

export default App;
