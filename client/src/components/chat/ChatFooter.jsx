import React, { Component } from 'react';

const { io } = window;

export class ChatFooter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      msg: '',
    };
  }

  onStaticChange = (e) => {
    this.setState({ msg: e.target.value });
  }
  
  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      console.log('sending');
      io.socket.get('/chat/channel/message', 
                    {
                      channelId: 1, 
                      msg: this.state.msg, 
                      channelName: 'dump'
                    });
    }
  }

  render = () => {
    return (
      <div className="footer">
        <div className="user-menu">
          <span className="user-menu_profile-pic">

          </span>
          <span className="user-menu_username">
            Chika</span>
          <img className="connection_icon" src="data:image/png;base64,iVBORw0KGgoAAAAN..."/>
          <span className="connection_status">online
          </span>
        </div>
        <div className="input-box">
          <input 
          value={this.state.msg}
          onChange={this.onStaticChange}
          onKeyPress={this.handleKeyPress}
            className="input-box_text" type="text"/>
        </div>
      </div>
    );
  }
}


