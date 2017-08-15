import React from 'react';

class MessageAdder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      addMessageUrl: 'https://matthew-test.herokuapp.com/messages/?format=json',
      newMessageValue: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({newMessageValue: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    const that = this;

    var fetchConfig = {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({text: this.state.newMessageValue})
    }

    fetch(this.state.addMessageUrl, fetchConfig)
      .then(function(response) {
          var contentType = response.headers.get("content-type");
          if(contentType && contentType.includes("application/json")) {
            return response.json();
          }
          throw new TypeError("Oops, we haven't got JSON!");
      })
      .then(function(json) {
        console.log('payload from POST API response:', json);
        that.setState({newMessageValue: ''});
      });
  }


  render() {
    return (
      <div>
        <form ref='user_form' onSubmit={this.handleSubmit}>
          New Message: <input type="text" value={this.state.newMessageValue} onChange={this.handleChange} />
          <button type="submit" disabled={this.props.loadStatus}>Add</button>
        </form>
      </div>
    );
  }

}

export default MessageAdder;