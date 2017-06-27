import React, { Component } from 'react';
import { Button, Header, Icon, Modal, Input } from 'semantic-ui-react'
import Channel from './Channel';

export default class MessageListings extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  hideModal = () => {
    this.setState({ showModal: false });
  }

  addChannel = () => {
    console.log('add channel');
    this.setState({ showModal: true });
  }
  
  render = () => {
    return (
      <div className="listings">
        <div className="listings_channels">
          <h2 className="listings_header">Channels</h2>
          <span onClick={this.addChannel} className="listings_add">+</span>
          <ul className="channel_list">
            <li className="channel active">
              <Channel name={"admin"} unread={0} />
            </li>
            <li className="channel">
              <Channel name={"general"} unread={20} />
            </li>
          </ul>
          <Modal 
            open={this.state.showModal}
            onClose={this.hideModal}
            basic size='small'>
            <Header icon='archive' content='Archive Old Messages' />
            <Modal.Content>
              <p>Channel name</p>
              <Input focus placeholder="Channel nam..." />
            </Modal.Content>
            <Modal.Actions>
              <Button basic color='red' inverted>
                <Icon name='remove' /> No
              </Button>
              <Button color='green' inverted>
                <Icon name='checkmark' /> Yes
              </Button>
            </Modal.Actions>
          </Modal>
        </div>
        {/* <div className="listings_direct-messages">
            <h2 className="listings_header">Direct Messages</h2>
            <ul className="channel_list">
            <li className="channel"><a className="channel_name"><span className="unread">20</span><span><span className="prefix"> </span>kryton</span></a></li>
            </ul>
            </div> */}
      </div>
    )
  }
}
