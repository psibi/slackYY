import React from 'react';

export default function Channel(props) {
  return (
    <a className="channel_name">
      <span className="unread">{props.unread}</span>
      <span>
        <span className="prefix">#</span>
        {props.name}
      </span>
    </a>
  );
}
