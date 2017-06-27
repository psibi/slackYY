import React, { Component } from 'react';
import { Modal, Button } from 'antd';

export default class ChannelModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: true,
    };
  }
  
  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>Open</Button>
        <Modal
          title="Create Channel"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    );
  }  

}

