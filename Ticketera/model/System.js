const employeeModule = require('./Employee');
const workgroupModule = require('./Workgroup');
const ticketModule = require('./Ticket');
const reducedTicketModule  = require('./ReducedTicket');

class System{
	constructor(employees){
		this.employees = employees;
		this.workgroups = [];
	}

	//FIXME: precondición: los aliases de empleados y grupos deben ser difenrentes (@sara, #devs)
	getEmployees(){
		return this.employees;
	}

	getWorkgroups(){
		return this.workgroups;
	}

	registerEmployee(newEmployee){
		this.employees.push(newEmployee);
	}

	registerWorkgroup(_workgroup){
		this.workgroups.push(_workgroup);
	}

	existEmplayeeWithAlias(employeeAlias){
		let res = false;
		for(var i=0; i < this.employees.length; i++){
			res = res || (this.employees[i].getAlias() == employeeAlias);
		}
		return res;
	}

	getEmployeeByAlias(employeeAlias){
		for(var i=0; i < this.employees.length; i++){
			if(this.employees[i].isHisAlias(employeeAlias)){
				return this.employees[i];
			}
		}
	}

	getWorkgroupByAlias(alias){
		for(var i=0; i < this.workgroups.length; i++){
			if(this.workgroups[i].isHisAlias(alias)){
				return this.workgroups[i];
			}
		}
	}

	getMemberByAlias(alias){
		let member = this.getEmployeeByAlias(alias);
		//let member = this.getWorkgroupByAlias(alias);
		return member;
	}

	// enviar ticket a grupo o empleado
	sendTicketTo(ticket, aliasDestiny, aliasOrigin){
		aliasOrigin.addToOutbox(ticket);
		aliasDestiny.addToInbox(ticket);
	}

	getInboxOfMemberWithAlias(alias){
		const member = this.getMemberByAlias(alias);
		return this.reduceInfoFromTickets(member.getInbox())
	}

	reduceInfoFromTickets(listOfTickets){
		let newListOfTickets = [];
		for(var i=0; i < listOfTickets.length; i++){
			const from  = listOfTickets[i].getFrom();
			const topic = listOfTickets[i].getTopic();
			const state = listOfTickets[i].getState();
			const prior = listOfTickets[i].getPriority();
			newListOfTickets.push(new reducedTicketModule.ReducedTicket(from, topic, prior, state));
		}
		return newListOfTickets;
	}

	verifyIndexForMemberInbox(paramIndex, paramAlias){
		const member = this.getMemberByAlias(paramAlias);
		return member.getAmountOfTicketsFromInbox() >= paramIndex;
	}

	getTicketInIndexFromMemberInbox(paramIndex, paramAlias){
		const member = this.getMemberByAlias(paramAlias);
		return member.getTicketNFromInbox(paramIndex);
	}
}

module.exports = {System};