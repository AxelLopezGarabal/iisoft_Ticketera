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

	//Nivel de prioridad, donde 0 sería el nivel más alto de prioridad. (A definir)
	getLevelOfPriority(){
		if(this.priority = 'bajo'){
			return 2;
		}
		if(this.priority = 'medio'){
			return 1;
		}
		if(this.priority = 'urgente'){
			return 0;
		}
		return 3;
	}
}

module.exports = {Ticket};