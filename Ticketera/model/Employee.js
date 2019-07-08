const employeeModule = require('./Employee');

class Employee{
	constructor(name, lastname, alias, position, hash){
		this.idkey = undefined;
		this.name = name;
		this.image = '/image/standarImage';
		this.lastname = lastname;
		this.alias = alias;
		this.password = hash;
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
		return this.outbox[index-1]
	}

	changeStateTicket(ticket, state){
		ticket.setState(state);
	}

	changePriorityTicket(ticket, priority){
		ticket.setPriority(priority)
	}

	sendTicketsToEmployees(employees,ticket){
		employees.forEach(function(element){
			element.addToInbox(ticket);
		});
		this.addToOutbox(ticket);
	}

	verifyPassword(employeePassword){
		return this.password == employeePassword;
	}
}

module.exports = {Employee};