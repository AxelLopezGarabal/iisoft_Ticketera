const employeeModule = require('./Employee');
const workgroupModule = require('./Workgroup');
const ticketModule = require('./Ticket');
const reducedTicketModule  = require('./ReducedTicket');

class System{
	constructor(employees){
		this.employees = employees;
		this.workgroups = [];
		this.enterprices = [];
	}

	getEnterpriceByName(enterpriceName){
		for(var i=0; i < this.enterprices.length; i++){
			if(this.enterprices[i].isHisName(enterpriceName)){
				return this.enterprices[i];
			}
		}
	}

	registerEnterprice(newEnterprice){
		this.enterprices.push(newEnterprice);
	}

	existEnterpriceWithName(enterpriceName){
		var result = false;
		for(var i=0; i < this.enterprices.length; i++){
				result = result || this.enterprices[i].isHisName(enterpriceName);
		}
		return result;
	}

	getEmployeesFromEnterpriceWithName(enterpriceName){
		this.getEnterpriceByName(enterpriceName).getEmployees();
	}

	addEmployeeWithAliasToEnterpriceWithName(employeeAlias, enterpriceName){
		const employee = this.getEmployeeByAlias(employeeAlias);
		this.getEnterpriceByName(enterpriceName).addEmployee(employee);
	}

	getEmployees(){
		return this.employees;
	}

	getWorkgroups(){
		return this.workgroups;
	}

	getEnterprices(){
		return this.enterprices;
	}

	registerEmployee(newEmployee){
		this.employees.push(newEmployee);
	}

	registerWorkgroup(_workgroup){
		this.workgroups.push(_workgroup);
	}

	existEmployeeWithAlias(employeeAlias){
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

	//TODO: check
	getMemberByAlias(alias){
		let x = this.getEmployeeByAlias(alias);
		let member = Object.is(x, undefined) ? this.getWorkgroupByAlias(alias) : x;
		return member;
	}
	

	// enviar ticket a grupo o empleado
	sendTicketTo(ticket, aliasDestiny, aliasOrigin){
		aliasOrigin.addToOutbox(ticket);
		aliasDestiny.addToInbox(ticket);
	}

	getInboxOfEmployeeWithAlias(alias){
		const employee = this.getEmployeeByAlias(alias);
		return this.reduceInfoFromTickets(employee.getInbox())
	}
	//TODO: check
	getInboxOfMemberWithAlias(alias){
		const member = this.getMemberByAlias(alias);
		return this.reduceInfoFromTickets(member.getInbox())
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
	//TODO: check
	verifyIndexForMemberInbox(paramIndex, paramAlias){
		const member = this.getMemberByAlias(paramAlias);
		return member.getAmountOfTicketsFromInbox() >= paramIndex;
	}

	getTicketInIndexFromEmployeeInbox(paramIndex, paramAlias){
		const employee = this.getEmployeeByAlias(paramAlias);
		return employee.getTicketNFromInbox(paramIndex);
	}
	//TODO: check
	getTicketInIndexFromMemberInbox(paramIndex, paramAlias){
		const member = this.getMemberByAlias(paramAlias);
		return member.getTicketNFromInbox(paramIndex);
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