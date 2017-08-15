import React from 'react';

import Message from './Message.js';
import MessageListNav from './MessageListNav.js';

class MessageList extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const messages = this.props.messages.map((message) =>
      <li key={message.id}><Message message={message} /></li>
    );

    return (
      <div>
        <h2>Messages</h2>
        <MessageListNav 
          _loadNextPage={this.props._loadNextPage} 
          _loadPrevPage={this.props._loadPrevPage}
          nextPageUrl={this.props.nextPageUrl}
          prevPageUrl={this.props.prevPageUrl}
        />
        <ul>
          {messages}
        </ul>
      </div>
    );
  }
}

export default MessageList;