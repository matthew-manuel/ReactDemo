import React from 'react';

import Message from './Message.js';

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
          <ul>
            {messages}
          </ul>
      </div>
    );
  }
}

export default MessageList;