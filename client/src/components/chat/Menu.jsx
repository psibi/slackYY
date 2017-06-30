import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import _ from 'lodash';
import { fetchChannel, createChannel } from '../../actions/channel';
import { fetchUser, updateCurrentChannel } from '../../actions/meta';
import { fetchMessage, receivedChatMessage } from '../../actions/message';

const { io } = window;

class Menu extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    currentChannelId: PropTypes.number.isRequired,
    messageData: PropTypes.arrayOf(PropTypes.object).isRequired,
    currentUser: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
    }).isRequired,
    channelInfo: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      channelName: '',
    };
  }

  componentDidMount = () => {
    const { dispatch } = this.props;
    this.props.dispatch(fetchChannel());
    this.props.dispatch(fetchUser());
    io.socket.on('chatBroadcast', data => dispatch(receivedChatMessage(data)));
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.currentChannelId !== this.props.currentChannelId) {
      if (_.isUndefined(nextProps.messageData[nextProps.currentChannelId])) {
        this.props.dispatch(fetchMessage(nextProps.currentChannelId));
      }
    }
  }

  onChannelClick = channel => () => {
    const { name, id } = channel;
    this.props.dispatch(updateCurrentChannel(name, id));
  }

  onStaticChange = field => (e) => {
    this.setState({ [field]: e.target.value });
  }

  createNewChannel = () => {
    this.props.dispatch(createChannel(this.state.channelName));
    io.socket.get('/chat/channel/join', { channelName: this.state.channelName });
    this.setState({
      channelName: '',
      open: false,
    });
  }

  addChannel = () => {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  render = () => {
    const { currentUser } = { ...this.props };
    if (_.isEmpty(currentUser)) {
      currentUser.name = '';
      currentUser.email = '';
    }

    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={this.handleClose}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Create"
        primary
        keyboardFocused
        onTouchTap={this.createNewChannel}
        onClick={this.createNewChannel}
      />,
    ];

    return (
      <section>
        <aside id="leftsidebar" className="sidebar">
          <div className="user-info">
            <div className="image"> <img src="/images/boy.png" width="48" height="48" alt="User" /> </div>
            <div className="info-container">
              <div className="name" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{this.props.currentUser.name}</div>
              <div className="email">{this.props.currentUser.email}</div>
            </div>
          </div>
          <div className="menu">
            <ul className="list">
              <li className="header">MAIN NAVIGATION</li>
              <li>
                <a
                  onClick={this.addChannel}
                  href="#channel"
                >
                  <i className="material-icons">pets</i><span>Add Channel</span>
                </a>
              </li>
              <li className="header">Channels</li>
              {
                _.map(this.props.channelInfo, elem =>
                   (
                     <li key={elem.id} onClick={this.onChannelClick(elem)}>
                       <a href="#channel">
                         <i className="material-icons">donut_small</i>
                         <span>{elem.name}</span>
                       </a>
                     </li>
                  ))
              }
            </ul>
          </div>
        </aside>
        <MuiThemeProvider>
          <Dialog
            title="Create Channel"
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
          >
            <TextField
              value={this.state.channelName}
              onChange={this.onStaticChange('channelName')}
              hintText="Channel name"
            />
          </Dialog>
        </MuiThemeProvider>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.meta.currentUser,
  channelInfo: state.channel.channelInfo,
  messageData: state.message.messageData,
  currentChannelId: state.meta.currentChannelId,
});

export default connect(mapStateToProps)(Menu);
