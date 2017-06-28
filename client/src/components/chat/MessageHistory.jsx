import React, { Component } from 'react';
import Message from './Message';

export class MessageHistory extends Component {

  constructor(props) {
    super(props);
    this.state = {
      
    }
  }
  
  render = () => {
    return (
      <div className="message-history">
        <Message 
          userName={"Chika"} 
          createdAt={"2017-06-28T06:30:21.000Z"} 
          msg={"Rather than trying to make your own, use RocketMail instead."} 
        />
      </div>
    )
  }
}
