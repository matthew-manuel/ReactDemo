import React from 'react';

class MessageDeleteButton extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick(message) {
    var deleteConfirmed = confirm("Uh, do you really wanna delete Message ID#"+ message.id +"?");
    if (deleteConfirmed) {
      console.log('deleteConfirmed', message);
      this._deleteMessage(message);
    }
  }

  _deleteMessage(message) {
    var fetchConfig = {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "DELETE"
    }

    const that = this;

    fetch(message.url, fetchConfig)
      .then(function(response) {
          console.log(response.headers);
          if (response.ok) {
            that.props.reloadPage();
            return response.status;
          }
          throw new TypeError("Oops, we didn't get a 204 on DELETE! Got: ", response.status);
      });

  }

  render() {
    return (
      <button onClick={() => { this.handleClick(this.props.message)} }>Delete Message {this.props.message.id}</button>
    );
  }

}

export default MessageDeleteButton;