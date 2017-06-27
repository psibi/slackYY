import React, { Component } from 'react';


export default class ChannelModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: true,
    };
  }
  


  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>Open</Button>
        
      </div>
    );
  }  

}

