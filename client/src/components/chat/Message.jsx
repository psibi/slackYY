import React from 'react';
import moment from 'moment';

export default function Message(props) {
  return (
    <div className="message">
      <a className="message_profile-pic" href=""></a>
      <a className="message_username" href="">{props.userName}</a>
      <span className="message_timestamp">{moment(props.createdAt).format('h:mm a')}</span>
      <span className="message_star"></span>
      <span className="message_content">{props.msg}</span>
    </div>
  );
}
