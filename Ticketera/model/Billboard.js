class Billboard{
    
    constructor(){
        this.tickets = [];
        this.billboard = [];

    }

    getTickets(){
        return this.tickets;
    }

    setTicket(ticket){
        this.tickets.push(ticket);
    }

    setBillboard(billboard){
        this.billboard.push(billboard);
    }

    getBillboard(){
        return this.billboard;
    }

    sortByPriority(){
        const items = this.tickets;
        return items.sort(function (a, b) {
            if (a.getPriority() < b.getPriority()) {
                return 1;
            }
            if (a.getPriority() > b.getPriority()) {
                return -1;
            }
            // a must be equal to b
            return 0;
        });
    }

    higherPriority(tick1, tick2){
        if(tick1.getPriority() >= tick2.getPriority()){
            return tick1;
        }
        else{
            return tick2;
        }
    }
}

module.exports = {Billboard};