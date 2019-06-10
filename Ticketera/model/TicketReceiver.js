class TicketReceiver{
	constructor(alias){
		this.idkey = undefined;
		this.alias = alias;
		this.inbox = [];
	}

	getAlias(){
		return this.alias;
	}

	isHisAlias(alias){
		return this.alias == alias
	}

	// TICKETS
	addToInbox(ticket){
		this.inbox.push(ticket);
	}

	getInbox(){
		return this.inbox;
	}

	//Ordena la lista de inbox por el nivel prioridad.
	orderInBoxByPriority(){
		this.inbox.sort(function(a, b){return a.getLevelOfPriority()-b.getLevelOfPriority()})
	}

	getAmountOfTicketsFromInbox(){
		return this.inbox.length;
	}

	getTicketNFromInbox(index){
		return this.inbox[index-1]
	}
}

module.exports = {TicketReceiver};