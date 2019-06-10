class Ticket{
	constructor(from, to, topic, content, state, priority){
		this.idkey = undefined;
		this.from = from;
		this.to = to;
		this.topic = topic;
		this.content = content;
		this.state = state;
		this.priorityEnum = {
			URGENT: 1,
			MEDIUM: 2,
			SLOW: 3,
			properties: {
				1: {name: "urgente", value: 1},
				2: {name: "medio", value: 2},
				3: {name: "bajo", value: 3}
			}
		};
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

	getPriorityEnum(){
		return this.priorityEnum;
	}

	
}

module.exports = {Ticket};