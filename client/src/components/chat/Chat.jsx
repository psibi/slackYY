import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import Message from './Message';
import { createMessage, fetchMessage } from '../../actions/message';

class Chat extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    currentChannelId: PropTypes.number.isRequired,
    currentChannel: PropTypes.string.isRequired,
    messageData: PropTypes.arrayOf(PropTypes.object).isRequired,
    user: PropTypes.shape({
      name: PropTypes.string,
    }).isRequired,
  }

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
    if (nextProps.currentChannelId !== this.props.currentChannelId &&
        _.isUndefined(nextProps.messageData[nextProps.currentChannelId])) {
      this.props.dispatch(fetchMessage(nextProps.currentChannelId));
    }
  }

  onStaticChange = field => (e) => {
    this.setState({ [field]: e.target.value });
  }

  handleKeyPress = (e) => {
    const { msg } = this.state;
    const { currentChannelId, currentChannel } = this.props;
    if (e.key === 'Enter') {
      this.props.dispatch(createMessage(msg, currentChannelId, currentChannel, this.props.user));
      this.setState({ msg: '' });
    }
  }

  render = () => {
    const { currentChannelId, messageData } = this.props;

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
                    _.isNull(currentChannelId) ?
                    null :
                    _.map(messageData[currentChannelId],
                          elem => (
                            <Message
                              userName={elem.userName}
                              createdAt={elem.createdAt}
                              msg={elem.msg}
                              currentUserName={this.props.user.name}
                            />
                          ))
                  }
                </ul>
              </div>
              <div className="chat-footer">
                <MuiThemeProvider>
                  <TextField
                    value={this.state.msg}
                    onChange={this.onStaticChange('msg')}
                    onKeyPress={this.handleKeyPress}
                    className="chatInput"
                    fullWidth
                    multiLine
                    autoFocus
                    hintText="Your thoughts..."
                  />
                </MuiThemeProvider>
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
