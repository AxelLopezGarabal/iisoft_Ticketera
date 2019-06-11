const employeeModule = require('./Employee');
const workgroupModule = require('./Workgroup');
const ticketModule = require('./Ticket');
const reducedTicketModule  = require('./ReducedTicket');

class System{
	constructor(employees){
		this.employees = employees;
		this.workgroups = [];
	}

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

	// enviar ticket a grupo o empleado
	sendTicketTo(ticket, aliasDestiny, employeeAliasOrigin){
		employeeAliasOrigin.addToOutbox(ticket);
		aliasDestiny.addToInbox(ticket);
	}

	getInboxOfTheEmployeeWithAlias(alias){
		const employee = this.getEmployeeByAlias(alias);
		return this.reduceInfoFromTickets(employee.getInbox())
	}

	getOutboxOfTheEmployeeWithAlias(alias){
		const employee = this.getEmployeeByAlias(alias);
		return this.reduceInfoFromTickets(employee.getOutbox());
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

	verifyIndexForEmployeeInbox(paramIndex, paramAlias){
		const employee = this.getEmployeeByAlias(paramAlias);
		return employee.getAmountOfTicketsFromInbox() >= paramIndex;
	}

	verifyIndexForEmployeeOutbox(paramIndex, paramAlias){
		const employee = this.getEmployeeByAlias(paramAlias);
		return employee.getAmountOfTicketsFromOutbox() >= paramIndex;
	}

	getTicketInIndexFromEmployeeInbox(paramIndex, paramAlias){
		const employee = this.getEmployeeByAlias(paramAlias);
		return employee.getTicketNFromInbox(paramIndex);
	}

	getTicketInIndexFromEmployeeOutbox(paramIndex, paramAlias){
		const employee = this.getEmployeeByAlias(paramAlias);
		return employee.getTicketNFromOutbox(paramIndex);
	}
}

module.exports = {System};