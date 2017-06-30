import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

export default function Message(props) {
  if (props.currentUserName === props.userName) {
    return (
      <li className="clearfix">
        <div className="message-data text-right">
          <span className="message-data-time" >{moment(props.createdAt).format('h:mm a')}</span> &nbsp; &nbsp;
          <span className="message-data-name" >{props.userName}</span>
          <i className="zmdi zmdi-circle me" />
        </div>
        <div className="message other-message float-right">{props.msg}</div>
      </li>
    );
  }
  return (
    <li>
      <div className="message-data">
        <span className="message-data-name">
          <i className="zmdi zmdi-circle online" /> {props.userName}
        </span>
        <span className="message-data-time">{moment(props.createdAt).format('h:mm a')}</span>
      </div>
      <div className="message my-message"> {props.msg}
      </div>
    </li>
  );
}

Message.propTypes = {
  createdAt: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  msg: PropTypes.string.isRequired,
  currentUserName: PropTypes.string.isRequired,
};

