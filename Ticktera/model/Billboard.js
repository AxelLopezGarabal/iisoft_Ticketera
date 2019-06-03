class Billboard{
    
    constructor(){
        this.tickets = new Array();
        this.billboard = new Array();

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

    sortByPriority(){
        var ret = new Array();
        var cop = this.tickets;
        cop.forEach(function(element){
            if(cop.length = 1){
                ret.push(cop[0]);
                cop.splice(0,1);
            }else{
                var t = higherPriority(element,cop[1]);
                if(t == element){
                    ret.push(t);
                }else{
                    cop.push(t);
                }
            }
            cop.splice(0,1);
        });
    return ret;
    }

    higherPriority(tick1, tick2){
        if(tick1.getPriority()<=tick2.getPriority()){
            return tick1;
        }
        else{return tick2;}
    }
}

module.exports = {Billboard};