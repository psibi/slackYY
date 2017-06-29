import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Message2 from './Message2';
import { fetchMessage } from '../../actions/message';
import { createMessage } from '../../actions/message';

const { io } = window;

class Chat extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      msg: '',
    };
  }

  componentDidMount = () => {
    const initialChannelId = 1;
    this.props.dispatch(fetchMessage(initialChannelId));
  }
  
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.currentChannelId !== this.props.currentChannelId) {
      if (_.isUndefined(nextProps.messageData[nextProps.currentChannelId])) {
        this.props.dispatch(fetchMessage(nextProps.currentChannelId));
      }
    }
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
      
      this.props.dispatch(createMessage(msg, currentChannelId, currentChannel, this.props.user));
      this.setState({msg: ''});
    }
  }

  onStaticChange = field => (e) => {
    console.log('field', e.target.value);
    this.setState({ [field]: e.target.value });
  }
  
  render = () => {
    
    const { currentChannelId, messageData } = this.props;
    console.log('jas', currentChannelId, messageData);
    if (_.isNull(currentChannelId))
      return (<p>hello </p>);

    return (
      <section className="content chat-app">
        <div className="container-fluid">
          <div className="row clearfix">
            <div className="chat">
              <div className="chat-header clearfix"> <img src="/images/factory.png" alt="avatar" />
                <div className="chat-about">
                  <div className="chat-with">SlackYY: Xebia Product</div>
                  <div className="chat-num-messages">Chat on!</div>
                </div>
              </div>
              <div className="chat-history">
                <ul>
                  {
                    _.map(messageData[currentChannelId], 
                          (elem, index) => {
                            return (
                              <Message2
                                userName={elem.userName} 
                                createdAt={elem.createdAt} 
                                msg={elem.msg} 
                                arrayIndex={index}
                              />
                            );
                          })
                  }
                </ul>
              </div>
              <div className="chat-footer">
                <input 
                  value={this.state.msg}
                  onChange={this.onStaticChange('msg')}
                  onKeyPress={this.handleKeyPress}
                  type="text" 
                  className="chatInput" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  messageData: state.message.messageData,
  currentChannelId: state.meta.currentChannelId,
  currentChannel: state.meta.currentChannel,
  user: state.meta.currentUser,
});

export default connect(mapStateToProps)(Chat);
