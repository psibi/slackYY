import React from 'react';

export function MessageListings() {
  return (
    <div className="listings">
      <div className="listings_channels">
        <h2 className="listings_header">Channels</h2>
        <span className="listings_add">+</span>
        <ul className="channel_list">
          <li className="channel active">
            <a className="channel_name">
              <span className="unread">0</span>
              <span>
                <span className="prefix">#</span>
                admin
              </span>
            </a>
          </li>
          <li className="channel">
            <a className="channel_name">
              <span className="unread">10</span>
              <span>
                <span className="prefix">#</span>
                general
              </span>
            </a>
          </li>
        </ul>
      </div>
      <div className="listings_direct-messages">
        <h2 className="listings_header">Direct Messages</h2>
        <ul className="channel_list">
          <li className="channel"><a className="channel_name"><span className="unread">20</span><span><span className="prefix"> </span>kryton</span></a></li>
        </ul>
      </div>
    </div>
  )
}
