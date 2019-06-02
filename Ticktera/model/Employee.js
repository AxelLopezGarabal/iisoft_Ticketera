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
}

module.exports = {Employee};