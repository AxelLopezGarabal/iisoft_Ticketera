const employeeModule = require('./Employee');

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
}

module.exports = {System};