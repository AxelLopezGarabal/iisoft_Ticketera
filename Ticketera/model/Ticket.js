

class Ticket{
	constructor(from, to, topic, content, state, priority){
		this.idkey = undefined;
		this.from = from;
		this.to = to;
		this.topic = topic;
		this.content = content;
		this.state = state;
		this.priority = priority;
	}

	/*
	State {
		PENDING: 1,
		APPROVED: 2,
		REJECTED: 3,
		DONE: 4
	}

	Priority {
		URGENT: 1,
		MEDIUM: 2,
		SLOW: 3
	}
	*/

	getFrom(){
		return this.from;
	}

	getTopic(){
		return this.topic;
	}

	getState(){
		return this.state;
	}

	getPriority(){
		return this.priority;
	}

	setState(state){
		this.state = state;
	}

	setPriority(priority){
		this.priority = priority;
	}

	
}

module.exports = {Ticket};