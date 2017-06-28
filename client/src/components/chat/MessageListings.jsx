import React, { Component } from 'react';
import { Button, Header, Icon, Modal, Input } from 'semantic-ui-react'
import { connect } from 'react-redux';
import _ from 'lodash';
import Channel from './Channel';
import { fetchChannel, createChannel } from '../../actions/channel';
import { updateCurrentChannel } from '../../actions/meta';
import { fetchMessage } from '../../actions/message';

const { io } = window;

class MessageListings extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      channelName: '',
    };
  }

  hideModal = () => {
    this.setState({ showModal: false });
  }

  addChannel = () => {
    console.log('add channel');
    this.setState({ showModal: true });
  }

  componentDidMount = () => {
    console.log('nope');
    this.props.dispatch(fetchChannel());
    io.socket.on('chatBroadcast', function gotResponse(data) {
      console.log('got data', data);
    });
    /* io.socket.get('/say/hello', function gotResponse(data, jwRes) {
     *   console.log('Server responded with status code ' + jwRes.statusCode + ' and data: ', data);
     * });*/
  }
  
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.currentChannelId !== this.props.currentChannelId) {
      console.log('not equal');
    }
    console.log('equal');
  }
  
  createNewChannel = () => {
    this.props.dispatch(createChannel(this.state.channelName));
    this.setState({ 
      channelName: '', 
      showModal: false,
    });
    io.socket.get('/chat/channel/join', {channelName: this.state.channelName},  function gotResponse(data, jwRes) {
      console.log('Server responded with status code ' + jwRes.statusCode + ' and data: ', data);
    });
  }

  joinChannel = (channelName) => {
    io.socket.get('/chat/channel/join', {channelName: channelName},  function gotResponse(data, jwRes) {
      console.log('Server responded with status code ' + jwRes.statusCode + ' and data: ', data);
    });
    // Also retrieve channel messages
  }
  
  onStaticChange = (e) => {
    this.setState({ channelName: e.target.value });
  }

  onChannelClick = channel => (e) => {
    const { name, id } = channel;
    this.props.dispatch(updateCurrentChannel(name, id));
    console.log('channel id', channel);
  }
  
  render = () => {
    return (
      <div className="listings">
        <div className="listings_channels">
          <h2 className="listings_header">Channels</h2>
          <span onClick={this.addChannel} className="listings_add">+</span>
          <ul className="channel_list">
            {
              _.map(this.props.channelInfo, (elem) => {
                return (
                  <li className="channel active" key={elem.id} onClick={this.onChannelClick(elem)}>
                    <Channel name={elem.name} unread={0} />
                  </li>
                );
              })
            }
          </ul>
          <Modal 
            open={this.state.showModal}
            onClose={this.hideModal}
            basic size='small'>
            <Header icon='archive' content='Archive Old Messages' />
            <Modal.Content>
              <p>Channel name</p>
              <Input 
                focus 
                onChange={this.onStaticChange}
                value={this.state.channelName}
                placeholder="Channel name..." />
            </Modal.Content>
            <Modal.Actions>
              <Button 
                onClick={this.createNewChannel}
                color='green' inverted>
                <Icon name='checkmark' /> Create
              </Button>
            </Modal.Actions>
          </Modal>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  channelInfo: state.channel.channelInfo,
  currentChannelId: state.meta.currentChannelId,
});

export default connect(mapStateToProps)(MessageListings);
