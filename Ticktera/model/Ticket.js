class Ticket{
	constructor(id, from, to, topic, content, state, priority){
		this.idkey = id;
		this.from = from;
		this.to = to;
		this.topic = topic;
		this.content = content;
		this.state = state;
		this.priority = priority;
	}
}

module.exports = {Ticket};