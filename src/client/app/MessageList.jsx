import React from 'react';

import Message from './Message.jsx';
import MessageListNav from './MessageListNav.jsx';

class MessageList extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    var messages = (this.props.messages && this.props.messages.constructor === Array) ? this.props.messages : [];
    var messagesJsx = messages.map((message) =>
      <li key={message.id}><Message message={message} reloadPage={this.props.reloadPage} /></li>
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
          {messagesJsx}
        </ul>
      </div>
    );
  }
}

export default MessageList;