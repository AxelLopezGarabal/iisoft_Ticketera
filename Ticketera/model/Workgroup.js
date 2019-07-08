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
    
}

module.exports = {Workgroup};