var assert = require('assert');



//--------------------------------------------------------------------------------------------------------------------------------------------

const e = require('../model/Employee');
const employee1 = new e.Employee("joey","ramone","@moncho","manager");
const anna = new e.Employee('Anna', 'Smith', '@anna', 'Developer');
const marie = new e.Employee('Marie', 'Smith', '@marie', 'Developer');
const ticket1 = "tick1";

const t = require('../model/Ticket');
const ticket2 = new t.Ticket("Turner","Turner2","prueba","ticket de prueba asd", 2, 3)
const ticket3 = new t.Ticket("Ripo","Pipo","testingggggg","Esto es un ticket", 4, 2)
const ticket4 = new t.Ticket("NN","HH","test","very dificult", 3, 1)


describe('Employee', function() {
    describe('#getName()', function() {
        it('should return employee names', function() {
            assert.equal(employee1.getName(), "joey");
        });
    });

    describe('#getLastName()', function() {
        it('should return employee last names', function() {
            assert.equal(employee1.getLastname(), "ramone");
        });
    });

    describe('#getAlias()', function() {
        it('should return employee alias', function() {
            assert.equal(employee1.getAlias(), "@moncho");
        });
    });

    describe('#getPosition()', function() {
        it('should return employees positions', function() {
            assert.equal(employee1.getPosition(), "manager");
        });
    });

    describe('#getChangeAlias()', function() {
        it('should change employee alias', function() {
            employee1.changeAlias("@moncholo");  
            assert.equal(employee1.getAlias(), "@moncholo");
        });
    });

    describe('#getInbox()', function() {
        it('should add ticket to inbox', function() {
            employee1.addToInbox(ticket1);  
            assert.equal(employee1.getInbox().length,1);
        });
    });

    describe('#getOutbox()', function() {
        it('should add ticket to outbox', function() {
            employee1.addToOutbox(ticket1);  
            assert.equal(employee1.getOutbox().length,1);
        });
    });

    describe('#isHisAlias()', function() {
        it('should check if its his alias', function() {  
            assert.equal(employee1.isHisAlias("@moncholo"),true);
        });
    });

    describe('#sendTicketsToEmployees', function(){
        it('should send tickets to employees', function(){
            var list = [anna,marie]; 
            employee1.sendTicketsToEmployees(list,ticket1);
            assert.equal(anna.getAmountOfTicketsFromInbox(), 1);
            assert.equal(marie.getAmountOfTicketsFromInbox(),1);
        });
    });

    describe('#getTicketNFromInbox', function(){
        it('should return the ticket in the position N from the inbox', function(){
            var list = [anna,marie]; 
            employee1.sendTicketsToEmployees(list,ticket1);
            const ticket = anna.getTicketNFromInbox(1);
            assert.equal(ticket, ticket1);
        });
    });

    describe('#getAmountOfTicketsFromOutbox', function(){
        it('should return the amount of tickets in the outbox', function(){
            var list = [anna,marie]; 
            marie.sendTicketsToEmployees(list,ticket1);
            assert.equal(marie.getAmountOfTicketsFromOutbox(),1);
        });
    });

    describe('#getTicketNFromOutbox', function(){
        it('should return the ticket in the position N from the outbox', function(){
            var list = [marie]; 
            anna.sendTicketsToEmployees(list,ticket1);
            const ticket = anna.getTicketNFromOutbox(1);
            assert.equal(ticket, ticket1);
        });
    });


    describe('#changeStateTicket()', function() {
        it('should change the state of the ticket to a valid state', function() {
            employee1.changeStateTicket(ticket2, 'done')  
            assert.equal(ticket2.getState(), 'done');
        });
    });

    describe('#changePriorityTicket()', function() {
        it('should change the state of the ticket to a valid state', function() {
            employee1.changePriorityTicket(ticket2, 'lower')  
            assert.equal(ticket2.getPriority(), 'lower');
        });
    });
/*    

    describe('#sortInBoxByPriority()', function(){
        it('should sort the in box array by priority', function(){
            employee1.addToInbox(ticket2);
            employee1.addToInbox(ticket3);
            employee1.addToInbox(ticket4);
            employee1.sortInBoxByPriority();
            assert.equal(employee1.getInbox(), [ticket4, ticket3, ticket2]);
        })
    })

    describe('#sortInBoxByState()', function(){
        it('should sort the in box array by state', function(){
            employee1.addToInbox(ticket2);
            employee1.addToInbox(ticket3);
            employee1.addToInbox(ticket4);
            employee1.sortInBoxByState();
            assert.equal(employee1.getInbox(), [ticket3, ticket4, ticket2]);
        })
    })
    */
});
