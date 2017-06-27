import Channel from './Channel';
import React from 'react';

export function MessageListings() {
  return (
    <div className="listings">
      <div className="listings_channels">
        <h2 className="listings_header">Channels</h2>
        <span className="listings_add">+</span>
        <ul className="channel_list">
          <li className="channel active">
            <Channel name={"admin"} unread={0} />
          </li>
          <li className="channel">
            <Channel name={"general"} unread={20} />
          </li>
        </ul>
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
