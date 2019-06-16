var assert = require('assert');





const t = require('../model/Ticket');
const ticket1 = new t.Ticket("Turner","Turner2","prueba","ticket de prueba asd", 1, 3)


describe('Ticket', function() {

    describe('#getFrom()', function() {
        it('should return ticket from', function() {
            assert.equal(ticket1.getFrom(), "Turner");
        });
    });
    
    describe('#getTopic()', function() {
        it('should return ticket topic', function() {
            assert.equal(ticket1.getTopic(), "prueba");
        });
    });
    
    describe('#getState()', function() {
        it('should return ticket 1', function() {
            assert.equal(ticket1.getState(), 1);
        });
    });
    
    describe('#getPriority()', function() {
        it('should return ticket 3', function() {
            assert.equal(ticket1.getPriority(), 3);
        });
    });

});
