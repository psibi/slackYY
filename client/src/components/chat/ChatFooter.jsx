import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createMessage } from '../../actions/message';

const { io } = window;

class ChatFooter extends Component {

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
    const { msg } = this.state;
    const { currentChannelId, currentChannel } = this.props;
    if (e.key === 'Enter') {
      console.log('sending', this.props);
      /* io.socket.get('/chat/channel/message', 
       *               {
       *                 channelId: currentChannelId, 
       *                 msg: msg, 
       *                 channelName: currentChannel,
       *               });*/
    
      this.props.dispatch(createMessage(msg, currentChannelId, currentChannel));
      this.setState({msg: ''});
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

const mapStateToProps = state => ({
  currentChannelId: state.meta.currentChannelId,
  currentChannel: state.meta.currentChannel,
});

export default connect(mapStateToProps)(ChatFooter);
