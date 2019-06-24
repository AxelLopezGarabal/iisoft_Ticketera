const ticketReceiverModule = require('./TicketReceiver');


class Workgroup extends ticketReceiverModule.TicketReceiver{

    constructor(alias, billboard){
        super(alias);
        this.billboard = billboard;
    }
    
}

module.exports = {Workgroup};