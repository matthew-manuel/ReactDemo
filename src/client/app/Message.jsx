import React from 'react';

import MessageDeleteButton from './MessageDeleteButton.jsx';

class Message extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <table>
          <tbody>
            <tr><th>ID</th><td>{this.props.message.id}</td></tr>
            <tr><th>Message</th><td>{this.props.message.text}</td></tr>
            <tr><th>Created</th><td>{this.props.message.created_at}</td></tr>
            <tr><th>URL</th><td><a href={this.props.message.url} target="_blank">{this.props.message.url}</a></td></tr>            
          </tbody>
        </table> 
        <MessageDeleteButton message={this.props.message} reloadPage={this.props.reloadPage} />
      </div>
    );
  }

}

export default Message;