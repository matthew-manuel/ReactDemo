import React from 'react';
import {render} from 'react-dom';

import MessageList from "./MessageList.jsx";
import MessageAdder from "./MessageAdder.jsx";

class App extends React.Component {
	constructor(props) {
		super(props);
	    this.state = {
			messagesUrl: 'https://matthew-test.herokuapp.com/messages/?format=json',
	     	messages: null,
			nextPageUrl: null,
			prevPageUrl: null,
			loadStatus: null
	    };

	    this._loadNextPage = this._loadNextPage.bind(this);
	    this._loadPrevPage = this._loadPrevPage.bind(this);
	    this.reloadPage = this.reloadPage.bind(this);
	}

	_loadMessages(url) {
		const that = this;

		that.setState({
			loadStatus: 'loading'
		});

		fetch(url)
			.then(function(response) {
			    var contentType = response.headers.get("content-type");
			    if(contentType && contentType.includes("application/json")) {
			      return response.json();
			    }
			    throw new TypeError("Oops, we haven't got JSON!");
			})
			.then(function(json) {
				console.log('payload from API response:', url, json);

				that.setState({
					messages: json.results,
					messagesUrl: url,
					nextPageUrl: json.next,
					prevPageUrl: json.previous,
			        loadStatus: 'loaded'
			    });
			}).then(function(){
				console.log('Messages loaded from API:', that.state.messages);
			});	
	}

	_loadNextPage() {
		this._loadMessages(this.state.nextPageUrl);

		console.log('Loaded Next page: ', this.state.messagesUrl);
	}

	_loadPrevPage() {
		this._loadMessages(this.state.prevPageUrl);
		console.log('Loaded Prev page: ', this.state.messagesUrl);
	}

	componentWillMount() {
		this.reloadPage();
  	}

  	reloadPage() {
		console.log('Reloading page: ', this.state.messagesUrl);

  		this._loadMessages(this.state.messagesUrl);
  	}

	render () {
		let messagesContent = null;

	    if (this.state.loadStatus == 'loaded') {
			messagesContent = <MessageList 
				messages={this.state.messages} 
				_loadNextPage={this._loadNextPage}
				_loadPrevPage={this._loadPrevPage}
				nextPageUrl={this.state.nextPageUrl}
				prevPageUrl={this.state.prevPageUrl}
				reloadPage={this.reloadPage}
			/>
	    } else {
	    	messagesContent = "Loading from API!";
	    }

    	return (
    		<div>
	    		<h1>Matthew's React Demo</h1>
				<MessageAdder loading={this.state.loadStatus} />

				{messagesContent}
        	</div>
		);
  	}
}

render(<App/>, document.getElementById('app'));
