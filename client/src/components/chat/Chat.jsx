import React, { Component } from 'react';

export default class Chat extends Component {
  render = () => {
    return (
      <section className="content chat-app">
        <div className="container-fluid">
          <div className="row clearfix">
            <div className="chat">
              <div className="chat-header clearfix"> <img src="/images/factory.png" alt="avatar" />
                <div className="chat-about">
                  <div className="chat-with">Xebia Channel</div>
                  <div className="chat-num-messages">Chat on!</div>
                </div>
              </div>
              <div className="chat-history">
                <ul>
                  <li className="clearfix">
                    <div className="message-data text-right"> <span className="message-data-time">10:10 AM, Today</span> &nbsp; &nbsp; <span className="message-data-name">Olia</span> <i className="zmdi zmdi-circle me"></i> </div>
                    <div className="message other-message float-right"> Hi Vincent, how are you? How is the project coming along? </div>
                  </li>
                  <li>
                    <div className="message-data"> <span className="message-data-name"><i className="zmdi zmdi-circle online"></i> Vincent</span> <span className="message-data-time">10:12 AM, Today</span> </div>
                    <div className="message my-message"> Are we meeting today? Project has been already finished and I have results to show you. </div>
                  </li>
                  <li className="clearfix">
                    <div className="message-data text-right"> <span className="message-data-time">10:14 AM, Today</span> &nbsp; &nbsp; <span className="message-data-name">Olia</span> <i className="zmdi zmdi-circle me"></i> </div>
                    <div className="message other-message float-right"> Well I am not sure. The rest of the team is not here yet. Maybe in an hour or so? Have you faced any problems at the last phase of the project? </div>
                  </li>
                  <li>
                    <div className="message-data"> <span className="message-data-name"><i className="zmdi zmdi-circle online"></i> Vincent</span> <span className="message-data-time">10:20 AM, Today</span> </div>
                    <div className="message my-message"> Actually everything was fine. I'm very excited to show this to our team. </div>
                  </li>
                </ul>
              </div>
              <div className="chat-footer">
                <input type="text" className="chatInput"></input>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

