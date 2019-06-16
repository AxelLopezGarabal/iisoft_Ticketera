var assert = require('assert');



//--------------------------------------------------------------------------------------------------------------------------------------------

const e = require('../model/Employee');
const employee1 = new e.Employee("joey","ramone","@moncho","manager");
const anna = new e.Employee('Anna', 'Smith', '@anna', 'Developer');
const marie = new e.Employee('Marie', 'Smith', '@marie', 'Developer');
const ticket1 = "tick1";

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
});
