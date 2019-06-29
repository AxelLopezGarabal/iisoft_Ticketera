const enterpriseModule = require('./Enterprise');
const ticketModule = require('./Ticket');
const reducedTicketModule  = require('./ReducedTicket');
/*
  El sistema es el core de la aplicación, contiene:
   - una lista de todos los empleados (a título informativo, ya que los empleados corresponden a cada empresa)
   - una lista con todas las empresas
*/
class System{
	constructor(){
		this.employees = []; //TODO: esto debería quedar?
		this.enterprises = [];
	}

	getEnterpriseByName(enterpriseName){
		for(var i=0; i < this.enterprises.length; i++){
			if(this.enterprises[i].isHisName(enterpriseName)){
				return this.enterprises[i];
			}
		}
	}

	registerEnterprise(newEnterprise){
		this.enterprises.push(newEnterprise);
	}

	existEnterpriseWithName(enterpriseName){
		var result = false;
		for(var i=0; i < this.enterprises.length; i++){
				result = result || this.enterprises[i].isHisName(enterpriseName);
		}
		return result;
	}

	getEmployeesFromEnterpriseWithName(enterpriseName){
		const enterprise = this.getEnterpriseByName(enterpriseName);
		return enterprise.getEmployees();
	}

	getEmployeeByAlias(employeeAlias){
		for(var i=0; i < this.enterprises.length; i++){
			if(this.enterprises[i].existEmployeeWithAlias(employeeAlias)){
				return this.enterprises[i].getEmployeeByAlias(employeeAlias);
			}
		}
	}

	getWorkgroupsFromEnterpriseWithName(enterpriseName){
		const enterprise = this.getEnterpriseByName(enterpriseName);
		return enterprise.getWorkgroups();
	}

	
	//TODO: (enterpriseName, {params})
	addEmployeeToEnterpriseWithNameAndParams(enterpriseName, name, lastname, alias, position){
		const enterprise = this.getEnterpriseByName(enterpriseName);
		enterprise.createEmployee(name, lastname, alias, position);
	}

	addWorkgroupToEnterpriseWithNameAndParams(enterpriseName, groupName){
		const enterprise = this.getEnterpriseByName(enterpriseName);
		enterprise.createWorkgroup(groupName);
	}


	existEmployeeWithAliasInEnterpriseWithName(memberAlias, enterpriseName){
		const enterprise = this.getEnterpriseByName(enterpriseName);
		return enterprise.existEmployeeWithAlias(memberAlias);
	}

	existEmployeeWithAlias(memberAlias){
		var result = false;
		for(var i=0; i < this.enterprises.length; i++){
			result = result || this.enterprises[i].existEmployeeWithAlias(memberAlias);
		}
		return result;
	}	

	getMemberWithAliasFromEnterpriseWithName(memberAlias, enterpriseName){
		const enterprise = this.getEnterpriseByName(enterpriseName);
		return enterprise.getMemberByAlias(memberAlias);
	}

	getEnterprises(){
		return this.enterprises;
	}

	// enviar ticket a grupo o empleado
	sendTicketTo(enterpriseName, ticket, aliasOrigin, aliasDestiny){
		// busco empleados / grupo
		const enterprise = this.getEnterpriseByName(enterpriseName);
		const sender = enterprise.getMemberByAlias(aliasOrigin);
		const receiver = enterprise.getMemberByAlias(aliasDestiny);
		// envio ticket
		sender.addToOutbox(ticket);
		receiver.addToInbox(ticket);
	}

	getEnterpriseOfEmployeeWithAlias(employeeAlias){
		for(var i=0; i < this.enterprises.length; i++){
			if(this.enterprises[i].existEmployeeWithAlias(employeeAlias)){
				return this.enterprises[i];
			}
		}
	}

	// INBOX / OUTBOX METHODS
	getInboxOfMemberWithAlias(enterpriseName, alias){
		const enterprise = this.getEnterpriseByName(enterpriseName);
		const member = enterprise.getMemberByAlias(alias);

		return this.reduceInfoFromTickets(member.getInbox());
	}

	getInboxWithAlias(alias){
		const enterprise = this.getEnterpriseOfEmployeeWithAlias(alias);
		const member = enterprise.getEmployeeByAlias(alias);

		return this.reduceInfoFromTickets(member.getInbox());
	}

	getOutboxOfTheEmployeeWithAlias(enterpriseName, alias){
		const enterprise = this.getEnterpriseByName(enterpriseName);
		const member = enterprise.getMemberByAlias(alias);

		return this.reduceInfoFromTickets(member.getOutbox());
	}

	getOutboxWithAlias(alias){
		const enterprise = this.getEnterpriseOfEmployeeWithAlias(alias);
		const member = enterprise.getEmployeeByAlias(alias);

		return this.reduceInfoFromTickets(member.getOutbox());
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

	verifyIndexForEmployeeInbox(enterpriseName, paramIndex, paramAlias){
		const member = this.getEmployeeByAlias(paramAlias);
		return member.getAmountOfTicketsFromInbox() >= paramIndex;
	}

	verifyIndexForMemberInbox(enterpriseName, paramIndex, paramAlias){
		const member = this.getMemberWithAliasFromEnterpriseWithName(paramAlias, enterpriseName);
		return member.getAmountOfTicketsFromInbox() >= paramIndex;
	}

	getTicketInIndexFromEmployeeInbox(enterpriseName, paramIndex, paramAlias){
		const member = this.getEmployeeByAlias(paramAlias, enterpriseName);
		return member.getTicketNFromInbox(paramIndex);
	}

	getTicketInIndexFromMemberInbox(enterpriseName, paramIndex, paramAlias){
		const member = this.getMemberWithAliasFromEnterpriseWithName(paramAlias, enterpriseName);
		return member.getTicketNFromInbox(paramIndex);
	}
//test
	verifyIndexForEmployeeOutbox(enterpriseName, paramIndex, paramAlias){
		const member = this.getEmployeeByAlias(paramAlias);
		return member.getAmountOfTicketsFromOutbox() >= paramIndex;
	}
//test
	getTicketInIndexFromEmployeeOutbox(enterpriseName, paramIndex, paramAlias){
		const member = this.getEmployeeByAlias(paramAlias);
		return member.getTicketNFromOutbox(paramIndex);
	}

}

module.exports = {System};