const ticketReceiverModule = require('./TicketReceiver');


class Workgroup extends ticketReceiverModule.TicketReceiver{

    constructor(alias, billboard){
        super(alias);
        this.billboard = billboard;
        this.members = []
    }

    getMembers(){
    	return this.members;
    }

    addMember(member){
    	this.members.push(member);
    }
    
    containsEmployeeWithAlias(paramAlias){
        let result = false;
        for(var i=0; i < this.members.length; i++){
            result = result || this.members[i].getAlias() == paramAlias;
        }
        return result;
    }
}

module.exports = {Workgroup};