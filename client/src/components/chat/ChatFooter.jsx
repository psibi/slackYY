import React from 'react';

export function ChatFooter() {
  return (
    <div className="footer">
      <div className="user-menu">
        <span className="user-menu_profile-pic">

        </span>
        <span className="user-menu_username">
          Chika</span>
        <img className="connection_icon" src="data:image/png;base64,iVBORw0KGgoAAAAN..."/>
        <span className="connection_status">online
        </span>
      </div>
      <div className="input-box">
        <input className="input-box_text" type="text"/>
      </div>
    </div>
  );
}

