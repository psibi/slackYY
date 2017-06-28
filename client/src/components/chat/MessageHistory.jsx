import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Message from './Message';
import { fetchMessage } from '../../actions/message';

class MessageHistory extends Component {

  constructor(props) {
    super(props);
    this.state = {
      
    }
  }
  
  componentDidMount = () => {
    const initialChannelId = 1;
    this.props.dispatch(fetchMessage(initialChannelId));
  }
  
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.currentChannelId !== this.props.currentChannelId) {
      if (_.isUndefined(this.props.messageData[this.props.currentChannelId])) {
        this.props.dispatch(fetchMessage(nextProps.currentChannelId));
      }
    }
  }  
  
  render = () => {
    const { currentChannelId, messageData } = this.props;
    console.log('jas', currentChannelId, messageData);
    if (_.isNull(currentChannelId))
      return null;
    return (
      <div className="message-history">
        {
          _.map(messageData[currentChannelId], 
                (elem) => {
                  return (
                    <Message 
                      userName={elem.userName} 
                      createdAt={elem.createdAt} 
                      msg={elem.msg} 
                    />
                  );
                })
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  messageData: state.message.messageData,
  currentChannelId: state.meta.currentChannelId,
});

export default connect(mapStateToProps)(MessageHistory);
