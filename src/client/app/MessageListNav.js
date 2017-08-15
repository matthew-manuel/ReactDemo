import React from 'react';

class MessageListNav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };

    this.handleNextNav = this.handleNextNav.bind(this);
    this.handlePrevNav = this.handlePrevNav.bind(this);
  }

  handleNextNav(e) {
    console.log("Load the NEXT page of messages");
    this.props._loadNextPage();
  }

  handlePrevNav(e) {
    console.log("Load the PREV page of messages");
    this.props._loadPrevPage();
  }

  render() {
    return (
      <div>
        <button onClick={this.handlePrevNav} disabled={this.props.prevPageUrl === null}>&lt; Prev</button>
        Showing X - Y of Z messages.
        <button onClick={this.handleNextNav} disabled={this.props.nextPageUrl === null}>Next &gt;</button>
      </div>
    );
  }

}

export default MessageListNav;