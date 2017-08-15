import React from 'react';
import {render} from 'react-dom';

import MessageList from "./MessageList.js";

class App extends React.Component {
	constructor(props) {
		super(props);
	    this.state = {
			messagesUrl: 'https://matthew-test.herokuapp.com/messages/?format=json',
	     	messages: undefined,
			nextPageUrl: null,
			prevPageUrl: null,
			loadStatus: null
	    };
	};

	_loadMessages() {
		const that = this;

		that.setState({
			loadStatus: 'loading'
		});

		fetch(this.state.messagesUrl)
			.then(function(response) {
			    var contentType = response.headers.get("content-type");
			    if(contentType && contentType.includes("application/json")) {
			      return response.json();
			    }
			    throw new TypeError("Oops, we haven't got JSON!");
			})
			.then(function(json) {
				console.log('Response JSON:', json);

				that.setState({
					messages: json.results,
					nextPageUrl: json.next,
					prevPageUrl: json.previous,
			        loadStatus: 'loaded'
			    });

			}).then(function(){
				// console.log(that.state.messages);
			});	
	}

	componentWillMount() {
    	this._loadMessages();
  	};

	render () {

		let output = null;

	    if (this.state.loadStatus == 'loaded') {
	    	console.log('messages=', this.state.messages);
			output = <MessageList messages={this.state.messages}/>
	    } else {
	    	output = "Loading from API!";
	    }

    	return (
    		<div>
	    		<h1>Matthew's React Demo</h1>
				{output}
        	</div>
		);
  	}
}

render(<App/>, document.getElementById('app'));
