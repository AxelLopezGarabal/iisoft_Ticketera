class ReducedTicket{
	constructor(from, topic, priority, state){
		this.from = from;
		this.topic = topic;
		this.priority = priority;
		this. state = state;
	}

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
}

module.exports = {ReducedTicket}