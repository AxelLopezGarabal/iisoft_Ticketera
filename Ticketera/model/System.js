const employeeModule = require('./Employee');
const ticketModule = require('./Ticket');
const reducedTicketModule  = require('./ReducedTicket');

class System{
	constructor(employees){
		this.employees = employees;
	}

	getEmployees(){
		return this.employees;
	}

	registerEmployee(newEmployee){
		this.employees.push(newEmployee);
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

	sendTicketTo(ticket, employeeAliasDestiny, employeeAliasOrigin){
		employeeAliasOrigin.addToOutbox(ticket);
		employeeAliasDestiny.addToInbox(ticket);
	}

	getInboxOfTheEmployeeWithAlias(alias){
		const employee = this.getEmployeeByAlias(alias);
		return this.reduceInfoFromTickets(employee.getInbox())
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

	getTicketInIndexFromEmployeeInbox(paramIndex, paramAlias){
		const employee = this.getEmployeeByAlias(paramAlias);
		return employee.getTicketNFromInbox(paramIndex);
	}
}

module.exports = {System};