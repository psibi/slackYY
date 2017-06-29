import React from 'react';
import moment from 'moment';
import classNames from 'classnames';

export default function Message(props) {
  return (
    <li className={classNames({clearfix: props.arrayIndex % 2 === 0})}>
      <div className="message-data text-right"> 
        <span className="message-data-time">
          {moment(props.createdAt).format('h:mm a')}
        </span> &nbsp; &nbsp; 
        <span className="message-data-name">{props.userName}</span> 
        <i className="zmdi zmdi-circle me">
        </i> 
      </div>
      <div className="message other-message float-right">
        {props.msg}
      </div>
    </li>
  );
}
