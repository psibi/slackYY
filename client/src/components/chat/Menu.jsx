import React, { Component } from 'react';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { fetchChannel, createChannel } from '../../actions/channel';
import _ from 'lodash';
import { fetchUser } from '../../actions/meta';
import { updateCurrentChannel } from '../../actions/meta';
import { fetchMessage, receivedChatMessage } from '../../actions/message';

const { io } = window;

class Menu extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      channelName: '',
    };
  }
  
  handleClose = () => {
    this.setState({open: false});
  };
  
  addChannel = () => {
    this.setState({open: true});
  }

  componentDidMount = () => {
    const { dispatch } = this.props;
    this.props.dispatch(fetchChannel());
    this.props.dispatch(fetchUser());
    io.socket.on('chatBroadcast', function gotResponse(data) {
      dispatch(receivedChatMessage(data));
    });
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.currentChannelId !== this.props.currentChannelId) {
      if (_.isUndefined(nextProps.messageData[nextProps.currentChannelId])) {
        this.props.dispatch(fetchMessage(nextProps.currentChannelId));
      }
    }    
  }

  createNewChannel = () => {
    this.props.dispatch(createChannel(this.state.channelName));
    io.socket.get('/chat/channel/join', {channelName: this.state.channelName},  function gotResponse(data, jwRes) {
    });
    this.setState({ 
      channelName: '', 
      open: false,
    });
  }
  
  onStaticChange = field => (e) => {
    this.setState({ [field]: e.target.value });
  }

  onChannelClick = channel => (e) => {
    const { name, id } = channel;
    this.props.dispatch(updateCurrentChannel(name, id));
  }
  
  render = () => {
    const { currentUser } = {...this.props};
    if (_.isEmpty(currentUser)) {
      currentUser.name = '';
      currentUser.email = '';
    }
    
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Create"
        primary={true}
        keyboardFocused={true}
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
                  href="#channel">
                  <i className="material-icons">pets</i><span>Add Channel</span> 
                </a> 
              </li>
              <li className="header">Channels</li>
                {
                  _.map(this.props.channelInfo, (elem) => {
                    return (
                      <li key={elem.id} onClick={this.onChannelClick(elem)}> 
                        <a href="javascript:void(0);">
                          <i className="material-icons">donut_small</i>
                          <span>{elem.name}</span> 
                        </a> 
                      </li>
                    );
                  })
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
              hintText="Channel name" />
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
