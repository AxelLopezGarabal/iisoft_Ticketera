const ticketReceiverModule = require('./TicketReceiver');


class Workgroup extends ticketReceiverModule.TicketReceiver{

    constructor(alias, billboard){
        super(alias);
        this.employees = [];
        this.billboard = billboard;
    }

    getEmployees(){
		return this.employees;
    }

    addEmployee(employee){
        this.employees.push(employee);
    }
    
}

module.exports = {Workgroup};