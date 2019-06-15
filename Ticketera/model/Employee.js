class Employee{
	constructor(name, lastname, alias, position){
		this.idkey = undefined;
		this.name = name;
		this.lastname = lastname;
		this.alias = alias;
		this.position = position;
		this.inbox = [];
		this.outbox = [];
	}

	getName(){
		return this.name;
	}

	getLastname(){
		return this.lastname;
	}

	getAlias(){
		return this.alias;
	}

	getPosition(){
		return this.position;
	}

	changeAlias(newAlias){
		this.alias = newAlias;
	}

	addToInbox(ticket){
		this.inbox.push(ticket);
	}

	getInbox(){
		return this.inbox;
	}

	addToOutbox(ticket){
		this.outbox.push(ticket);
	}

	getOutbox(){
		return this.outbox;
	}
	
	isHisAlias(alias){
		return this.alias == alias
	}

	//Ordena la lista de inbox por el nivel prioridad.
	/*
	sortInBoxByPriority(){
		this.inbox.sort(function(a, b){return a.getPriority()-b.getPriority()})
	}
	

	//Ordena la lista de inbox por nivel de estado (sería con el estado más alto)
	sortInBoxByState(){
		this.inbox.sort(function(a, b){return a.getState()-b.getState()})
		}
	}
	*/

	getAmountOfTicketsFromInbox(){
		return this.inbox.length;
	}

	getTicketNFromInbox(index){
		return this.inbox[index-1]
	}

	getAmountOfTicketsFromOutbox(){
		return this.outbox.length;
	}

	getTicketNFromOutbox(index){
		return this.inbox[index-1]	
	}

	changeStateTicketToDone(ticket){
		ticket.setState(4);
	}

	changeStateTicket(ticket, state){
		ticket.setState(state);
	}

	changePriorityTicket(ticket, priority){
		ticket.setPriority(priority)
	}
}

module.exports = {Employee};